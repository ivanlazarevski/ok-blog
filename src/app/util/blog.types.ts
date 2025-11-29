export type BlogPost = {
  _id: string;
  title: string;
  tags: string[];
  slug: PostSlug;
  excerpt: string;
  _createdAt: string;
  _rev: string;
  _updatedAt: string;
  minRead: number;
  body: PostBlock[]
}

export type PostSlug = {
  current: string;
  _type: string;
}

export type PostBlock = {
  markDefs: [],
  style: string,
  _key: string;
  _type: string;
  children: BlockChild[];
}

export type BlockChild = {
  marks: [];
  text: string;
  _key: string;
  _type: string;
}

export type TagCount = {
  tag: string;
  count: number;
}
