<template>
  <menus-button ico="image-handle" :text="t('bubbleMenu.image.handle')" @menu-click="openImageViewer" />
  <modal :visible="searchReplace" header="图片处理" :footer="false" class="umo-search-replace-dialog" width="90vw"
    mode="modeless" :z-index="200" @close="searchReplace = false">
    <div class="image-editor-modal">
      <div class="image-editor-container">
        <div id="canvas-container" class="canvas-container">
          <canvas id="imageCanvas" ref="imageCanvas" @mousedown="startDrawing" @mousemove="draw" @mouseup="stopDrawing"
            @mouseleave="stopDrawing"></canvas>
        </div>
        <div class="tools">
          <button @click="setTool('mosaic')" :class="{ active: currentTool === 'mosaic' }">马赛克</button>
          <button @click="setTool('rectangle')" :class="{ active: currentTool === 'rectangle' }">红框</button>
          <input v-model="brushSize" type="range" min="5" max="50" title="笔刷大小">
        </div>
        <div class="actions">
          <button @click="cancelImageEdit">取消</button>
          <button class="sure-btm" @click="confirmImageEdit">确认</button>
        </div>
      </div>
    </div>
  </modal>
</template>

<script setup lang="ts">
import { getSelectionNode } from '@/extensions/selection'
import { base64ToFile } from 'file64'
import { shortId } from '@/utils/short-id'

let editor = inject('editor')
let imageViewer = inject('imageViewer')

let searchReplace = $ref(false)
let img = $ref('')

// 编辑器内容引用
let editorContent = $ref(null);
let imageInput = $ref(null);
let imageCanvas = $ref(null);
let showImageEditor = $ref(false);

// 图像编辑相关状态
let currentTool = $ref('');
let brushSize = $ref(10);
let isDrawing = $ref(false);
let currentImage = $ref(null);
let lastX = $ref(0);
let lastY = $ref(0);
let canvasContext = $ref(null);
let originalImage = $ref(null);
let currentEditingImg = $ref(null);
let openImageViewer = () => {
  searchReplace = true
  let image = getSelectionNode(editor.value)
  console.log(image)
  img = image.attrs.src
  openImageEditor(img)
  // imageViewer.current = image.attrs.id
  // imageViewer.visible = true
}

// 打开图片编辑器
let openImageEditor = (imageSrc: string) => {
  console.log('imageSrc', imageSrc)
  let img = new Image();
  img.crossOrigin = "anonymous"; // 请求匿名跨域访问
  img.src = imageSrc; // 设置图片源

  img.onload = () => {
    originalImage = img;

    // 获取 Canvas 和容器
    let canvas = document.getElementById('imageCanvas') as any;
    let container = document.getElementById('canvas-container') as any;

    // 计算缩放比例
    let containerWidth: number = container.clientWidth;
    let containerHeight: number = container.clientHeight;
    let scale = Math.min(
      Math.max(containerWidth / img.width, 0.5), // 至少 50vw
      Math.max(containerHeight / img.height, 0.5) // 至少 50vh
    );

    // 设置 Canvas 尺寸
    canvas.width = img.width * scale;
    canvas.height = img.height * scale;

    // 获取 Canvas 上下文
    canvasContext = canvas.getContext('2d');

    // 绘制缩放后的图像
    canvasContext.drawImage(img, 0, 0, canvas.width, canvas.height);
    currentImage = canvasContext.getImageData(0, 0, canvas.width, canvas.height);
  };
}
// 设置当前工具
let setTool = (tool: string) => {
  currentTool = tool;
};

// 开始绘制
let startDrawing = (event: any) => {
  isDrawing = true;

  let canvas = imageCanvas;
  let rect = canvas.getBoundingClientRect();
  lastX = event.clientX - rect.left;
  lastY = event.clientY - rect.top;
};

// 绘制
let draw = (event: any) => {
  if (!isDrawing) return;

  let canvas = imageCanvas;
  let ctx = canvasContext;
  let rect = canvas.getBoundingClientRect();
  let currentX = event.clientX - rect.left;
  let currentY = event.clientY - rect.top;

  if (currentTool === 'mosaic') {
    // 绘制马赛克
    let pixelSize = brushSize;
    let x = Math.floor(currentX / pixelSize) * pixelSize;
    let y = Math.floor(currentY / pixelSize) * pixelSize;

    for (let i = 0; i < pixelSize; i += 5) {
      for (let j = 0; j < pixelSize; j += 5) {
        if (x + i < canvas.width && y + j < canvas.height) {
          let mosaicColor = generateSmoothMosaicColor(ctx, x + i, y + j, pixelSize);
          ctx.fillStyle = mosaicColor;
          ctx.fillRect(x + i, y + j, 5, 5);
        }
      }
    }
  } else if (currentTool === 'rectangle') {
    // 恢复最后保存的图像状态
    ctx.putImageData(currentImage, 0, 0);

    // 绘制红框
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.rect(lastX, lastY, currentX - lastX, currentY - lastY);
    ctx.stroke();
  }
};

// 停止绘制
let stopDrawing = () => {
  if (isDrawing) {
    isDrawing = false;

    // if (currentTool === 'rectangle') {
    // 保存当前状态
    currentImage = canvasContext.getImageData(0, 0, imageCanvas.width, imageCanvas.height);
    // }
  }
};

// 取消图片编辑
let cancelImageEdit = () => {
  showImageEditor = false;
  currentEditingImg = null;
};

// const { node, updateAttributes } = defineProps(nodeViewProps)
const options = inject('options')
// 确认图片编辑
let confirmImageEdit = async () => {
  // 将编辑后的图像插入编辑器
  let canvas = imageCanvas;
  let imageDataURL = canvas.toDataURL('image/png');
  const [data, type] = imageDataURL.split(';')[0].split(':')
  let [_, ext] = type.split('/')
  if (ext === 'jpeg') {
    ext = 'jpg'
  }
  if (ext === 'svg+xml') {
    ext = 'svg'
  }
  const filename = shortId(10)

  const file = await base64ToFile(imageDataURL, `${filename}.${ext}`, {
    type,
  })
  console.log(file)
  // const { id, url } =
  //     (await options.value?.onFileUpload?.(node.attrs.file)) ?? {}

  currentEditingImg = null;
};

const uploadImage = async () => {
  if (node.attrs.uploaded || !node.attrs.file) {
    return
  }
  try {

    // if (containerRef.value) {
    //   updateAttributes({ id, src: url, file: null, uploaded: true })
    // }
  } catch (error) {
    // useMessage('error', {
    //   attach: container,
    //   content: (error as Error).message,
    // })
  }
}
function generateSmoothMosaicColor(ctx: CanvasRenderingContext2D, x: number, y: number, pixelSize: number) {
  const sampledPixels: any = [];
  // 更智能地采样像素
  const samplePoints = [
    { x: 0.25, y: 0.25 },
    { x: 0.75, y: 0.25 },
    { x: 0.25, y: 0.75 },
    { x: 0.75, y: 0.75 }
  ];

  samplePoints.forEach(point => {
    const sampleX = Math.floor(x + point.x * pixelSize);
    const sampleY = Math.floor(y + point.y * pixelSize);

    try {
      const pixelData = ctx.getImageData(sampleX, sampleY, 1, 1).data;
      sampledPixels.push(pixelData);
    } catch (error) {
      console.error('Pixel sampling error', error);
    }
  });

  // 如果没有采样到像素，返回中性灰
  if (sampledPixels.length === 0) {
    return 'rgb(128, 128, 128)';
  }

  // 颜色统计
  const stats: any = {
    r: { sum: 0, min: 255, max: 0 },
    g: { sum: 0, min: 255, max: 0 },
    b: { sum: 0, min: 255, max: 0 }
  };

  sampledPixels.forEach((pixel: any[]) => {
    ['r', 'g', 'b'].forEach((channel, index) => {
      const value = pixel[index];
      stats[channel].sum += value;
      stats[channel].min = Math.min(stats[channel].min, value);
      stats[channel].max = Math.max(stats[channel].max, value);
    });
  });

  // 计算平均值和范围
  const avgColor = ['r', 'g', 'b'].map(channel => {
    const avg = Math.floor(stats[channel].sum / sampledPixels.length);
    const range = stats[channel].max - stats[channel].min;

    // 如果颜色变化很小，保持更稳定
    if (range < 10) {
      return avg;
    }

    // 轻微随机性，但控制在窄范围内
    const deviation = Math.min(10, Math.floor(range / 2));
    return Math.max(0, Math.min(255,
      avg + Math.floor(Math.random() * (deviation * 2 + 1)) - deviation
    ));
  });

  return `rgb(${avgColor[0]}, ${avgColor[1]}, ${avgColor[2]})`;

}


</script>
<style lang="less" scoped>
.canvas-container {
  // border: 1px solid #ddd;
  max-width: min(90vw, 1000px);
  max-height: min(90vh, 800px);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  /* 防止内容溢出 */
  canvas {
    min-width: 50vw;
    /* 最小宽度为视口宽度的 50% */
    min-height: 50vh;
    /* 最小高度为视口高度的 50% */
    max-width: 100%;
    /* 最大宽度不超过容器 */
    max-height: 100%;
    /* 最大高度不超过容器 */
    object-fit: contain;
    /* 保持图片比例 */
  }
}

.tools {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
  align-items: center;
}

.tools button {
  padding: 5px 10px;
  border: 1px solid #ddd;
  background-color: #f1f1f1;
  cursor: pointer;
  border-radius: 3px;
}

.tools button.active {
  background-color: #e0e0e0;
  font-weight: bold;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.actions button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.actions button:first-child {
  background-color: #f1f1f1;
}

.actions button:last-child {
  background: #0052d9;
  color: white;
}
</style>