import { Router } from "express";


const router = Router();

router.get('/', (req, res) => {
    res.render('chat', {layouts:'main'});
});

export default router;