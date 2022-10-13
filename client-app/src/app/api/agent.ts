import axios,{AxiosError, AxiosResponse} from 'axios';
import { Activity, ActivityFormValues } from '../model/activity';
import { toast } from 'react-toastify'
import { history } from '../..';
import { store } from '../stores/store';
import { User, UserFormValues } from '../model/user';


const sleep = (delay : number) => {
   return new Promise((resolve) => {
      setTimeout(resolve,delay)
   })
}

 axios.defaults.baseURL = 'http://localhost:5000/api/';

 axios.interceptors.request.use(config => {
   const token = store.commonStore.token;
   if(token) config.headers!.Authorization = `Bearer ${token}`
   return config; 
 })

 axios.interceptors.response.use(async response => {
      await sleep(1000);
      return response;
 },(error : AxiosError) => {
   const { status , data , config } = error.response as any;

   switch(status) {
      case 400:
            if(typeof data === 'string') toast.error(data)
            if(config.method === 'get' && data.errors.hasOwnProperty('id')) history.push('/not-found')
            if(data.errors){
               const modelStateErrors : string[] = [];
               for(const key in data.errors){
                if(data.errors[key]){
                    modelStateErrors.push(data.errors[key])
                }
               }
               throw modelStateErrors.flat();
            }  
            break;

      case 401 :
         toast.error('Unauthorized')
         break;
      case 404 :
         history.push('/not-found')
         break;
      case 500 :
         store.commonStore.setServerError(data);
         history.push('/server-error')
         break
   }
   return Promise.reject(error)
 })

 const responseBody = <T> (response : AxiosResponse<T>) => response.data;

 const request = {
    get : <T>(url:string) => axios.get<T>(url).then(responseBody),
    post : <T>(url:string,body:{}) => axios.post<T>(url,body).then(responseBody),
    put : <T>(url : string , body : {}) => axios.put<T>(url,body).then(responseBody),
    del : <T>(url:string) => axios.delete<T>(url).then(responseBody)
 }

 const Activites = {
    list : () => request.get<Activity[]>('/activities'),
    details : (id : string) => request.get<Activity>(`/activities/${id}`),
    create : (activity : ActivityFormValues) => request.post<void>(`/activities` , activity),
    update : (activity : ActivityFormValues) => request.put<void>(`/activities/${activity.id}`,activity),
    delete : (id : string) => request.del<void>(`/activities/${id}`),
    attend : (id : string) => request.post<void>(`/activities/${id}/attend` , {})
 }
 
 const Account = {
   current : () => request.get<User>('/account'),
   login : (user : UserFormValues) => request.post<User>('account/login' , user),
   register : (user : UserFormValues) => request.post<User>('/account/register' , user)
 }

 const agent = {
    Activites,
    Account
 }


 export default agent;