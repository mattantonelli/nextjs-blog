import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import remark from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData() {
  // Get all of the filenames in the /posts directory
  const fileNames = fs.readdirSync(postsDirectory);

  const allPostsData = fileNames.map((fileName) => {
    // The post ID is the filename without the extension
    const id = fileName.replace(/\.md$/, '');

    // Read the markdown file as a string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Parse the markdown and its metadata with gray-matter
    const matterResult = matter(fileContents);

    // Return the id and post data
    return {
      id,
      ...matterResult.data
    };
  });

  // Sort the posts by date, as provided by the metadata
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostIds() {
  // Get all of the filenames in the /posts directory
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        // Return the post IDs as the filenames without the extension
        id: fileName.replace(/\.md$/, '')
      }
    }
  });
}

export async function getPostData(id) {
  // Construct the path for the post file using the ID as the filename
  const fullPath = path.join(postsDirectory, `${id}.md`);

  // Read the file
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Parse the markdown with gray-matter
  const matterResult = matter(fileContents);

  // Use remark to convert the markdown to an HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);

  const contentHtml = processedContent.toString();

  return {
    id,
    contentHtml,
    ...matterResult.data
  };
}