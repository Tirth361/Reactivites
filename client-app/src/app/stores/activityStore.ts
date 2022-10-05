import { makeAutoObservable, runInAction } from 'mobx'
import agent from '../api/agent';
import { Activity } from '../model/activity';
import { v4 as uuid } from 'uuid'
import {format} from 'date-fns'

export default class ActivityStore {
    activityRegistry = new Map<string , Activity>();
    selectedActivity: Activity | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this);
    }

    get activitesByDate() {
        return Array.from(this.activityRegistry.values()).sort((a,b) => a.date!.getTime() - b.date!.getTime())
    }

    get groupedActivities() {
        return Object.entries(
            this.activitesByDate.reduce((activities , activity) => {
                const date =  format(activity.date!,'dd MMM yyyy')
                activities[date] = activities[date] ? [...activities[date],activity] : [activity];
                return activities; 
            } , {} as {[key : string] : Activity[]})
        )
    }

    loadActivites = async () => {
        this.setLoadingInitial(true)
        try {
            const activities = await agent.Activites.list();
            activities.forEach(activity => {
                this.setActivity(activity);
            });
            this.setLoadingInitial(false)
        } catch (err) {
            this.setLoadingInitial(false)
            console.log(err)
        }
    }

    loadActivity =async (id:string) => {
        let activity = this.getActivity(id)
        if(activity){
            runInAction(() => {
                this.selectedActivity = activity;
            })
            return activity;
        }
        else{
            this.loadingInitial = true;
            try {
                activity = await agent.Activites.details(id);
                runInAction(() => {
                    this.selectedActivity = activity;
                })
                this.setActivity(activity);
                this.setLoadingInitial(false);
                return activity
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }
    private setActivity = (activity : Activity) => {
        activity.date = new Date(activity.date!)
        this.activityRegistry.set(activity.id,activity);
    }
    private getActivity = (id : string) => {
        return this.activityRegistry.get(id);
    }
    createActivity = async (activity: Activity) => {
        this.loading = true;
        try {
            await agent.Activites.create(activity);
            runInAction(() => {
                this.activityRegistry.set(activity.id , activity)
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            })
        } catch (err) {
            runInAction(() => {
                this.loading = false;
            })
        }
    }
    updateActivity = async (activity: Activity) => {
        this.loading = true;
        try {
            await agent.Activites.update(activity);
            runInAction(() => {
                this.activityRegistry.set(activity.id,activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false
            })
        } catch (error) {
            console.log(error)
            runInAction(() => {
                this.loading = false;
            })
        }
    }
    deleteActivity =async (id:string) => {
        this.loading = true;
        try {
            await agent.Activites.delete(id);
            runInAction(() => {
                this.activityRegistry.delete(id)
                this.loading =false;
            })
        } catch (error) {
            console.log(error)
            runInAction(() => {
                this.loading = false
            })
        }
    }
    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state
    }
}