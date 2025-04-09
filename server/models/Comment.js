import { Schema , model} from 'mongoose';

const commentSchema = new Schema ({

})

const Comment = model("Comment", commentSchema);

export default Comment;