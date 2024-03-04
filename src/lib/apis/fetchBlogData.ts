'use server';

import axios from 'axios';
import decompressContent from '../utils/decompressContent';

export async function fetchBlogData({
  pageOwnerId,
  pageOwnerNickname,
  blogLink,
}: {
  pageOwnerId?: string;
  pageOwnerNickname?: string;
  blogLink: string;
}) {
  const mergedPath = `${process.env.REACT_APP_PROXY_HOST}${process.env.NEXT_PUBLIC_ROOT_ROUTE}/${process.env.NEXT_PUBLIC_CONTROLLER_ROLE}`;
  let memberId = pageOwnerId;

  // pageOwnerId가 제공되지 않고 pageOwnerNickname이 제공된 경우, 사용자 ID를 조회
  if (!pageOwnerId && pageOwnerNickname) {
    const appMemberResponse = await axios.get(
      `${mergedPath}/app_member/find_by_key`,
      {
        params: { NICKNAME: pageOwnerNickname },
      },
    );
    memberId = appMemberResponse.data.result.APP_MEMBER_IDENTIFICATION_CODE;
  }

  // 유효한 memberId가 없는 경우 오류 처리
  if (!memberId) {
    throw new Error('Either pageOwnerId or pageOwnerNickname must be provided');
  }

  const blogResponse = await axios.get(`${mergedPath}/blog/find_by_key`, {
    params: {
      APP_MEMBER_IDENTIFICATION_CODE: memberId,
      LINK: blogLink,
    },
  });
  const decompressedContent = await decompressContent(
    blogResponse.data.result['CONTENT'],
  );
  const blogContent = JSON.parse(decompressedContent);

  // Simplified return for the sake of this example
  return {
    ...blogResponse.data.result,
    CONTENT: blogContent,
  };
}
