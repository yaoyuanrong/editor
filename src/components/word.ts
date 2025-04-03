export const printUtils = {
  getStyledHTML:() => {
    const tempDiv = document.querySelector('.umo-editor');
    // 遍历所有元素添加内联样式
    const elements = tempDiv?.querySelectorAll('*');
    // 需要捕获的样式属性
    const stylesToCapture = [
      'display',
      'width',
      'color',
      'background-color',
      'font-weight',
      'font-style',
      'font-size',
      'text-align',
      'margin',
      'padding',
      'border',
      'line-height',
      'letter-spacing',
      'font-family',
      'background',
      'justify-content',
      'position'
    ];
    // 遍历所有元素
    elements?.forEach(el => {
      if(el.className.includes('es-drager-dot')) return;
      const computedStyle = window.getComputedStyle(el);
  
      // 收集有效的样式
      const inlineStyle = stylesToCapture
        .map(prop => {
          const value = computedStyle.getPropertyValue(prop);
          // 过滤掉默认值和空值
          return value &&
            value !== '0px' &&
            value !== 'normal' &&
            value !== 'none' &&
            value !== 'initial' &&
            value !== '0px none rgb(51, 51, 51)' &&
            value !== 'rgba(0, 0, 0, 0)'&&
            value !== 'rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box'
            ? `${prop}: ${value}`
            : null;
        })
        .filter(style => style !== null);
  
      // 如果有有效样式，则添加到元素
      if (inlineStyle.length > 0) {
        el.setAttribute('style', inlineStyle.join('; '));
      }
    });
    let htmlContent = `
    <!DOCTYPE html>
    <html xmlns:o='urn:schemas-microsoft-com:office:office' 
          xmlns:w='urn:schemas-microsoft-com:office:word' 
          xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body >
      <div id="sprite-plyr" style="display: none;">
      ${printUtils.getPlyrSprite()}
      </div>
      <div class="umo-editor-container" aria-expanded="false">
        <div class="tiptap umo-editor" translate="no">
          ${tempDiv?.innerHTML}
        </div>
      </div>
      
    </body>
    </html>`
    return htmlContent;
  },
  getStylesHtml: () => {
    return Array.from(document.querySelectorAll('link, style'))
      .filter((item:any) => item.hasAttribute('data-vite-dev-id') && 
      (item.getAttribute('data-vite-dev-id')?.includes('editor/index.vue') ||
      item.getAttribute('data-vite-dev-id')?.includes('editor/src/components/index.vue') ||
      item.getAttribute('data-vite-dev-id')?.includes('image/node-view.vue'))
    )
      .map((item:any) => item.outerHTML)
      .join('')
  },

  prepareEchartsForPrint: (htmlContent: string) => {
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = htmlContent

    const charts = tempDiv.querySelectorAll('.umo-node-echarts-body')
    for (const chartElement of charts) {
      const chartInstance = echarts.getInstanceByDom(chartElement as HTMLElement)
      if (chartInstance) {
        const imgData = chartInstance.getDataURL({
          type: 'png',
          pixelRatio: 2,
          backgroundColor: '#fff',
        })

        const imgElement = document.createElement('img')
        imgElement.src = imgData
        imgElement.style.width = '100%'

        chartElement?.parentNode?.replaceChild(imgElement, chartElement)
      }
    }
    return tempDiv.innerHTML
  },

  getContentHtml: (container: string) => {
    const originalContent =
      document.querySelector(`${container} .umo-page-content`)?.outerHTML ?? ''
    return printUtils.prepareEchartsForPrint(originalContent)
  },

  getPlyrSprite: () => {
    return document.querySelector('#sprite-plyr')?.innerHTML ?? ''
  },

  getIframeCode: (options: any, page: any, container: string, defaultLineHeight: string) => {
    const { orientation, size, margin, background } = page;
    // 生成原始 HTML 字符串
    let htmlContent = `
    <!DOCTYPE html>
    <html xmlns:o='urn:schemas-microsoft-com:office:office' 
          xmlns:w='urn:schemas-microsoft-com:office:word' 
          xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
      <title>${options.document?.title}</title>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      ${printUtils.getStylesHtml()}
      <style>
      body{
        overflow: auto;
        height: auto;
        background-color: ${background};
        -webkit-print-color-adjust: exact;
      }
      .umo-page-content{
        transform: scale(1) !important;
      }
      @page {
        size: ${orientation === 'portrait' ? size?.width : size?.height}cm ${orientation === 'portrait' ? size?.height : size?.width}cm; 
        padding: ${margin?.top}cm 0 ${margin?.bottom}cm;
        margin: 0;
      }
      @page:first {
        padding-top: 0;
      }
      @page:last {
        padding-bottom: 0;
        page-break-after: avoid;
      }
      </style>
    </head>
    <body class="is-print">
      <div id="sprite-plyr" style="display: none;">
      ${printUtils.getPlyrSprite()}
      </div>
      <div class="umo-editor-container" style="line-height: ${defaultLineHeight};" aria-expanded="false">
        <div class="tiptap umo-editor" translate="no">
          ${printUtils.getContentHtml(container)}
        </div>
      </div>
      <script>
        document.addEventListener("DOMContentLoaded", (event) => {
          const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
              if (mutation.removedNodes) {
                Array.from(mutation.removedNodes).forEach(node => {
                  if (node?.classList?.contains('umo-page-watermark')) {
                    location.reload();
                  }
                });
              }
            });
          });
        });
      <\/script>
    </body>
    </html>
    `;

    // 清理 HTML 字符串
    htmlContent = htmlContent
        .replace(/\n\s*/g, '') // 移除换行符和多余空白
        .replace(/\\/g, '');  // 移除多余的反斜杠

    return htmlContent;
  }
}