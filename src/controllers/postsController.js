import { postsRepository } from "../repositories/postsRepository.js";
import { getLinkPreview } from "link-preview-js";

export async function getPosts(req, res) {

    try {
      const posts = await postsRepository.getPosts();

      return res.status(201).send(posts.rows);

    } catch (error) {

      return res.status(500).send(error);

    }
}

export async function getUrlData(req, res) {
  let urldata;
  const { url } = req.body
  try {
    await getLinkPreview(url).then((data) =>
      {
        urldata=data;
      }
    );

    return res.status(200).send(urldata);

  } catch (error) {

    return res.status(500).send(error);

  }
} 
