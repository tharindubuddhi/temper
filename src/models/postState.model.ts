import ActionLogModel from './actionLog.model';
import PostModel from './post.model';

export interface PostState {
    postList:PostModel[];
    actionList:ActionLogModel[];
}