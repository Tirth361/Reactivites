using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Cores
{
    public class AppExecption
    {
        public AppExecption(int statusCode , string message , string details = null)
        {
            StausCode = statusCode;
            Message = message;
            Details = details;
        }

        public int StausCode { get; set; }
        public string Message { get; set; }
        public string Details { get; set; }
    }
}