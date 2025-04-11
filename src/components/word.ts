export const printUtils = {
  stylesToCapture: [
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
    'position',
    'text-indent',
  ],
  // 默认值列表
  defaultValues: [
    'table-column-group',
    'table-row-group',
    'table-row',
    'table-cell',
    'static',
    'normal',
    'counter-increment',
    'content',
    'none',
    'initial',
    '0px none rgb(51, 51, 51)',
    'rgba(0, 0, 0, 0)',
    'rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box',
  ],
  classesToSkip: ['umo-text-selection'],
  shouldSkipElement(element: Element): boolean {
    if (!element.className) return false

    const elementClasses = element.className.split(' ')
    return this.classesToSkip.some(
      (classToSkip) =>
        elementClasses.includes(classToSkip) ||
        element.className.includes(classToSkip),
    )
  },
  // 判断样式值是否为默认值
  isDefaultValue(value: string): boolean {
    return this.defaultValues.includes(value)
  },
  // 处理图片元素的特殊逻辑
  processImageElement(
    imgElement: HTMLImageElement,
    computedStyle: CSSStyleDeclaration,
  ): string[] {
    // 从计算样式中提取宽高并设置为HTML属性
    const width = computedStyle.getPropertyValue('width')
    const height = computedStyle.getPropertyValue('height')
    // 清除可能已存在的width/height属性
    imgElement.removeAttribute('width')
    imgElement.removeAttribute('height')
    // 设置width和height为HTML属性
    if (width && !this.isDefaultValue(width)) {
      imgElement.setAttribute('width', String(parseInt(width)))
    }
    if (height && !this.isDefaultValue(height)) {
      imgElement.setAttribute('height', String(parseInt(height)))
    }
    // 收集除宽高外的其他样式
    return this.collectStyles(computedStyle, ['width', 'height'])
  },
  // 收集元素的有效样式
  collectStyles(
    computedStyle: CSSStyleDeclaration,
    excludeProps: string[] = [],
  ): string[] {
    return this.stylesToCapture
      .filter((prop) => !excludeProps.includes(prop))
      .filter((prop) => {
        const value = computedStyle.getPropertyValue(prop)
        return value && !this.isDefaultValue(value)
      })
      .map((prop) => `${prop}: ${computedStyle.getPropertyValue(prop)}`)
  },
  // 处理单个元素的样式
  processElementStyles(element: Element): void {
    if (this.shouldSkipElement(element)) return
    const computedStyle = window.getComputedStyle(element)
    let inlineStyles = []
    if (element.tagName.toLowerCase() === 'img') {
      inlineStyles = this.processImageElement(
        element as HTMLImageElement,
        computedStyle,
      )
    } else {
      inlineStyles = this.collectStyles(computedStyle)
    }
    if (inlineStyles.length > 0) {
      element.setAttribute('style', inlineStyles.join('; '))
    }
  },
  getStyledHTML: () => {
    const editorElement = document.querySelector('.umo-editor')
    if (!editorElement) return ''
    // 处理所有元素的样式
    const elements = editorElement.querySelectorAll(
      '*:not([class*="es-drager-dot"]):not([class*="es-drager"])',
    )
    elements.forEach((el) => printUtils.processElementStyles(el))
    // 构建完整的HTML文档
    return `
    <!DOCTYPE html>
    <html xmlns:o='urn:schemas-microsoft-com:office:office' 
          xmlns:w='urn:schemas-microsoft-com:office:word' 
          xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body>
      <div id="sprite-plyr" style="display: none;">
        ${printUtils.getPlyrSprite()}
      </div>
      <div class="umo-editor-container" aria-expanded="false">
        <div class="tiptap umo-editor" translate="no">
          ${editorElement.innerHTML}
        </div>
      </div>
    </body>
    </html>`
  },
  getStylesHtml: () => {
    return Array.from(document.querySelectorAll('link, style'))
      .filter(
        (item: any) =>
          item.hasAttribute('data-vite-dev-id') &&
          (item
            .getAttribute('data-vite-dev-id')
            ?.includes('editor/index.vue') ||
            item
              .getAttribute('data-vite-dev-id')
              ?.includes('editor/src/components/index.vue') ||
            item
              .getAttribute('data-vite-dev-id')
              ?.includes('image/node-view.vue')),
      )
      .map((item: any) => item.outerHTML)
      .join('')
  },

  prepareEchartsForPrint: (htmlContent: string) => {
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = htmlContent

    const charts = tempDiv.querySelectorAll('.umo-node-echarts-body')
    for (const chartElement of charts) {
      const chartInstance = echarts.getInstanceByDom(
        chartElement as HTMLElement,
      )
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

  getIframeCode: (
    options: any,
    page: any,
    container: string,
    defaultLineHeight: string,
  ) => {
    const { orientation, size, margin, background } = page
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
    `

    // 清理 HTML 字符串
    htmlContent = htmlContent
      .replace(/\n\s*/g, '') // 移除换行符和多余空白
      .replace(/\\/g, '') // 移除多余的反斜杠

    return htmlContent
  },
}
