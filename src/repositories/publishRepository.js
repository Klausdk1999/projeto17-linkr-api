import connection from "../setup/database.js"

const haveHashtag = async(queryString) => {
    return connection.query(`
        SELECT *
        FROM hashtags
        WHERE name=$1`,
        queryString
    )
}

const newHashtag = async (queryString) => {
    return connection.query(`
        INSERT INTO hashtags
        (name, mentions)
        VALUES
        ($1, $2)`, 
        queryString
    )
}

const updateMentions = async(queryString) => {
    return connection.query(`
        UPDATE hashtags
        SET mentions= mentions + $1
        WHERE id=$2`,
        queryString
    )
}

const postPublish = async(queryString) => {
    return connection.query(`
        INSERT INTO posts
        (author_id, description, url)
        VALUES
        ($1, $2, $3)
        RETURNING id`,
        queryString
    )
}

const hashtagsPosts = async(queryString) => {
    return connection.query(`
        INSERT INTO hashtags_posts
        (hashtag_name, post_id)
        VALUES
        ($1, $2)`,
        queryString
    )
}

const postPreview = async(queryString) => {
    return connection.query(`
        INSERT INTO previews
        (title, url, description, favicon)
        VALUES
        ($1, $2, $3, $4)
        RETURNING id`,
        queryString
    )
}

const postPreviewPosts = async(queryString) => {
    return connection.query(`
    INSERT INTO previews_posts
    (preview_id, post_id)
    VALUES
    ($1, $2)
    `,
    queryString)
}

export const publishQuerys = {
    haveHashtag,
    newHashtag,
    updateMentions,
    postPublish,
    hashtagsPosts,
    postPreview,
    postPreviewPosts
};