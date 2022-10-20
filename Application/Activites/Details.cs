using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;
using Application.Cores;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using Application.Interface;

namespace Application.Activites
{
    public class Details
    {
        public class Query : IRequest<Result<ActivitiyDto>>
        {

            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, Result<ActivitiyDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context , IMapper mapper , IUserAccessor userAccessor)
            {
                _context = context;
                _mapper = mapper;
                _userAccessor = userAccessor;
            }

            public async Task<Result<ActivitiyDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities
                .ProjectTo<ActivitiyDto>(_mapper.ConfigurationProvider, new { currentUsername = _userAccessor.GetUsername()})
                .FirstOrDefaultAsync(x => x.Id == request.Id);
                return Result<ActivitiyDto>.Success(activity);
            }
        }

    }
}