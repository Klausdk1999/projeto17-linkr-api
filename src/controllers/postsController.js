import { postsRepository } from "../repositories/postsRepository.js";

export async function getPosts(req, res) {

    try {
      const posts = await postsRepository.getPosts();

      return res.status(201).send(posts.rows);

    } catch (error) {

      return res.status(500).send(error);

    }
} 