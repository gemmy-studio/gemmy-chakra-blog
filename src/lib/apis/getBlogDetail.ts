import axios from 'axios';
import decompressContent from '../utils/decompressContent';

interface BlogDetail {
  blogDetail?: any; // 더 구체적인 타입으로 교체 가능
  error?: string;
}

export async function getBlogDetail(
  ownerNickname: string,
  contentSlug: string,
  ownerID?: string,
): Promise<BlogDetail> {
  const mergedPath = `${process.env.REACT_APP_PROXY_HOST}${process.env.NEXT_PUBLIC_ROOT_ROUTE}/${process.env.NEXT_PUBLIC_CONTROLLER_ROLE}`;

  try {
    let appMemberIdentificationCode = ownerID;

    if (!appMemberIdentificationCode) {
      const appMemberResponse = await axios.get(
        `${mergedPath}/app_member/find_by_key`,
        {
          params: { NICKNAME: ownerNickname },
        },
      );
      appMemberIdentificationCode =
        appMemberResponse.data.result.APP_MEMBER_IDENTIFICATION_CODE;
    }

    const blogResponse = await axios.get(`${mergedPath}/blog/find_by_key`, {
      params: {
        APP_MEMBER_IDENTIFICATION_CODE: appMemberIdentificationCode,
        LINK: contentSlug,
      },
    });

    const decompressedContent = await decompressContent(
      blogResponse.data.result.CONTENT,
    );
    const blogContent = JSON.parse(decompressedContent);

    return {
      blogDetail: {
        ...blogResponse.data.result,
        CONTENT: blogContent,
      },
    };
  } catch (error) {
    return {
      error: 'Failed to fetch data',
    };
  }
}
