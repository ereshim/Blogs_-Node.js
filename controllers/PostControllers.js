import PostModel from '../models/Post.js'

export const getAll = async(req,res)=>{
try{
    const posts = await PostModel.find().populate('user').exec()
    res.json(posts)
}catch(err){
    console.log(err);
    res.status(500).json ({
       message: 'Не удалось получить статьи'
    })
}
}

export const getOne = async (req, res) => {
    try {
      const postId = req.params.id;
  
      const updatedPost = await PostModel.findOneAndUpdate(
        { _id: postId },
        { $inc: { viewsCount: 1 } },
        { new: true }
      );
  
      if (!updatedPost) {
        return res.status(404).json({ message: 'Статья не найдена' });
      }
  
      res.json(updatedPost);
    } catch (err) {
      console.error('Ошибка при обновлении статьи:', err.message);
      res.status(500).json({ message: 'Не удалось получить статью' });
    }
  };

  export const remuve  = async (req, res) => {
    try {
      const postId = req.params.id;
  
      const deletePost = await PostModel.findOneAndDelete(
        { _id: postId },
      );
  
      if (!deletePost) {
        return res.status(404).json({ message: 'Статья не найдена' });
      }
  
      res.json({
        success:true
      });

    } catch (err) {
      console.error('Ошибка при удалении статьи:', err.message);
      res.status(500).json({ message: 'Не удалось удалить статью' });
    }
  };

export const create = async (req,res)=>{
try{
    const doc = new PostModel({
          title:req.body.title,
          text:req.body.text,
          imageUrl:req.body.imageUrl,
          tags:req.body.tags,
          user:req.userId
    }) 
    const post = await doc.save()

    res.json(post)
}catch(err){
    console.log(err);
    res.status(500).json ({
       
        message: 'Не удалось создать статью'
    })
}
}

export const update = async(req,res)=>{
    try{
        const postId  = req.params.id

        await PostModel.findOneAndUpdate(
            { _id: postId },
            {
                title:req.body.title,
                text:req.body.text,
                imageUrl:req.body.imageUrl,
                tags:req.body.tags,
                user:req.userId,
            }
        );

        res.json({
            success:true
        })
    }catch(err){
        console.log(err);
    res.status(500).json ({
       
        message: 'Не удалось обновить статью'
    })
    }
}