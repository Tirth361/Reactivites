import { Grid, GridColumn, Loader } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import ActivityList from "./ActivityList";
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from "react";
import LoadingComponents from "../../../app/layout/LoadingComponents";
import ActivityFilters from "./ActivityFilters";
import { PagingParams } from "../../../app/model/pagination";
import InfiniteScroll from "react-infinite-scroller";
import ActivityListItemPlaceholder from "./ActivityListItemPlaceholder";


const ActivityDashBoard = () => {
    const { activityStore } = useStore();
    const { loadActivites, activityRegistry, setPagingParams, pagination } = activityStore;
    const [loadingNext, setLoadingNext] = useState(false);

    const handleGetNext = () => {
        setLoadingNext(true);
        setPagingParams(new PagingParams(pagination!.currentPage + 1))
        loadActivites().then(() => setLoadingNext(false))
    }

    useEffect(() => {
        if (activityRegistry.size <= 1) loadActivites();
    }, [activityRegistry.size, loadActivites])

    return (
        <>
            <Grid>
                <GridColumn width={10}>
                    {activityStore.loadingInitial && !loadingNext ? (
                        <>
                            <ActivityListItemPlaceholder />
                            <ActivityListItemPlaceholder />
                        </>
                    ) : (

                        <InfiniteScroll
                            pageStart={0}
                            loadMore={handleGetNext}
                            hasMore={!loadingNext && !!pagination && pagination.currentPage < pagination.totalPages}
                            initialLoad={false}
                        >
                            <ActivityList />
                        </InfiniteScroll>
                    )}
                </GridColumn>
                <GridColumn width={6}>
                    <ActivityFilters />
                </GridColumn>
                <Grid.Column width={10}>
                    <Loader active={loadingNext} />
                </Grid.Column>
            </Grid>
        </>
    )
}

export default observer(ActivityDashBoard)