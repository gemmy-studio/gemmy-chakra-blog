const extractAndJoinText = (contentArray: any) => {
  if (typeof contentArray?.block === 'object') {
    const titles = Object.values(contentArray.block as any)
      .filter((block: any) => block?.value.type === 'text')
      .map((block: any) => block?.value.properties?.title)
      .filter((titleArray: any) => titleArray !== undefined)
      .flatMap((titleArray: any) => titleArray.map((titleItem: any) => titleItem[0]))
      .filter((title: any) => title !== undefined);
    return titles.join(' ');
  }
  return contentArray
    .map((item: { content: any[] }) =>
      item.content
        .filter((contentItem) => contentItem.type === 'text')
        .map((textItem) => textItem.text)
        .join(' ')
    )
    .filter((text: string | any[]) => text.length > 0)
    .join(' ');
};

export default extractAndJoinText;
