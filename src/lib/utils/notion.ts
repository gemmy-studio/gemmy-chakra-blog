import { NotionAPI } from 'notion-client';
import { ExtendedRecordMap, SearchParams, SearchResults } from 'notion-types';

import { previewImagesEnabled } from '../configs/notionConfig';
import { getPreviewImageMap } from './preview-images';

const notion = new NotionAPI();

export async function getPage(notionId: string): Promise<ExtendedRecordMap> {
  const notionRecordMap = await notion.getPage(notionId);

  if (previewImagesEnabled) {
    const previewImageMap = await getPreviewImageMap(notionRecordMap);
    (notionRecordMap as any).preview_images = previewImageMap;
  }

  return notionRecordMap;
}

export async function search(params: SearchParams): Promise<SearchResults> {
  return notion.search(params);
}
