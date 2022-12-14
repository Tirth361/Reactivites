using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Cores;
using Application.Interface;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Comments
{
    public class List
    {
        public class Query : IRequest<Result<List<CommentDto>>>
        {
            public Guid ActivityId { get; set; }
        }
        public class Handler : IRequestHandler<Query, Result<List<CommentDto>>>
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
            public async Task<Result<List<CommentDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var comments = await _context.Comments
                .Where(x => x.Activity.Id == request.ActivityId)
                .OrderByDescending(x => x.CreatedAt)
                .ProjectTo<CommentDto>(_mapper.ConfigurationProvider , new { currentUsername = _userAccessor.GetUsername()})
                .ToListAsync();

                return Result<List<CommentDto>>.Success(comments);
            }
        }
    }
}