<template>
  <div class="examples">
    <div class="box">
      <umo-editor ref="editorRef" v-bind="options" />
    </div>
    <!-- <div class="box">
      <umo-editor editor-key="testaaa" :toolbar="{ defaultMode: 'classic' }" />
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { shortId } from '@/utils/short-id'

const editorRef = $ref(null)
const templates = [
  {
    title: '工作任务',
    description: '工作任务模板',
    content:
      '<h1>工作任务</h1><h3>任务名称：</h3><p>[任务的简短描述]</p><h3>负责人：</h3><p>[执行任务的个人姓名]</p><h3>截止日期：</h3><p>[任务需要完成的日期]</p><h3>任务详情：</h3><ol><li>[任务步骤1]</li><li>[任务步骤2]</li><li>[任务步骤3]...</li></ol><h3>目标：</h3><p>[任务需要达成的具体目标或结果]</p><h3>备注：</h3><p>[任何额外信息或注意事项]</p>',
  },
  {
    title: '工作周报',
    description: '工作周报模板',
    content:
      '<h1>工作周报</h1><h2>本周工作总结</h2><hr /><h3>已完成工作：</h3><ul><li>[任务1名称]：[简要描述任务内容及完成情况]</li><li>[任务2名称]：[简要描述任务内容及完成情况]</li><li>...</li></ul><h3>进行中工作：</h3><ul><li>[任务1名称]：[简要描述任务当前进度和下一步计划]</li><li>[任务2名称]：[简要描述任务当前进度和下一步计划]</li><li>...</li></ul><h3>问题与挑战：</h3><ul><li>[问题1]：[描述遇到的问题及当前解决方案或需要的支持]</li><li>[问题2]：[描述遇到的问题及当前解决方案或需要的支持]</li><li>...</li></ul><hr /><h2>下周工作计划</h2><h3>计划开展工作：</h3><ul><li>[任务1名称]：[简要描述下周计划开始的任务内容]</li><li>[任务2名称]：[简要描述下周计划开始的任务内容]</li><li>...</li></ul><h3>需要支持与资源：</h3><ul><li>[资源1]：[描述需要的资源或支持]</li><li>[资源2]：[描述需要的资源或支持]</li><li>...</li></ul>',
  },
]
const options = $ref({
  toolbar: {
    // defaultMode: 'classic',
    disableMenuItems: ['exportImage'],
    menus: ['base', 'insert', 'table', 'tools', 'page', 'export'],
  },
  document: {
    title: '测试文档123',
    content: '<page id="1hhqig8p" extend="false" pagenumber="1" force="false"><h4 id="n4o6u0" extend="false" data-toc-id="n4o6u0">（一）、TRUSS架规格参数</h4><p id="bp9q5i" extend="false">TRUSS架作为《2025年春节晚会》灯光设备异型加工项目的重要组成部分，其规格参数直接影响到整个灯光系统的稳定性和安全性。我们会严格按照招标要求，对TRUSS架的材料选择、尺寸精度和特殊工艺进行精准把控。在材料选择上，选用符合要求的6061 - T6铝合金，确保其具有良好的力学性能和耐腐蚀性。对于尺寸精度，严格控制主架、斜管和接口的精度，保证各部件之间的完美配合。在特殊工艺方面，采用先进的加工技术，确保斜管接口、四面斜管加工和铝板接口加固达到高标准。</p><table id="johitjj1" extend="false" style="min-width: 75px"><colgroup><col style="min-width: 25px"><col style="min-width: 25px"><col style="min-width: 25px"></colgroup><tbody><tr id="yrwaw7jw" extend="false"><td colspan="1" rowspan="1" style="border: 0.5px solid #ccc; padding: 0px;"><img id="a5snja9m" extend="false" vnode="true" type="image" src="https://lianqiai-public.oss-accelerate.aliyuncs.com/lianqiai/ai-compose/images/800e5539fb9aab20a3d554bd429e6980.jpeg" width="236" height="200" left="0" top="0" draggable="false" rotatable="false" equalproportion="true" flipx="false" flipy="false" uploaded="false" error="false" previewtype="image"></td><td colspan="1" rowspan="1" style="border: 0.5px solid #ccc; padding: 0px;"><img id="pqtcyisl" extend="false" vnode="true" type="image" src="https://lianqiai-public.oss-accelerate.aliyuncs.com/lianqiai/ai-compose/images/0ef6367de9f8475638468feb96a0b905.jpeg" width="227" height="200" left="0" top="0" draggable="false" rotatable="false" equalproportion="true" flipx="false" flipy="false" uploaded="false" error="false" previewtype="image"></td><td colspan="1" rowspan="1" style="border: 0.5px solid #ccc; padding: 0px;"><img id="qc1uuhul" extend="false" vnode="true" type="image" src="https://lianqiai-public.oss-accelerate.aliyuncs.com/lianqiai/ai-compose/images/d06f3a4cc216a96c74c294d612ec7990.jpeg" width="200" height="200" left="0" top="0" draggable="false" rotatable="false" equalproportion="true" flipx="false" flipy="false" uploaded="false" error="false" previewtype="image"></td></tr><tr id="sxc73tdh" extend="false"><td colspan="1" rowspan="1" style="border: 0.5px solid #ccc; padding: 3px;"><p id="0cp61xik" extend="false" style="text-align: center">6061 - T6铝合金</p></td><td colspan="1" rowspan="1" style="border: 0.5px solid #ccc; padding: 3px;"><p id="p6da5ubi" extend="false" style="text-align: center">主架</p></td><td colspan="1" rowspan="1" style="border: 0.5px solid #ccc; padding: 3px;"><p id="f8iejpux" extend="false" style="text-align: center">接口</p></td></tr></tbody></table><h5 id="iffzgi" extend="false" data-toc-id="iffzgi">1、 TRUSS架材料选择</h5><p id="l4q97bri" extend="false" class="indent-1">TRUSS架材料的选择至关重要，直接关系到其质量和性能。经过严格筛选，我们决定选用6061 - T6铝合金作为TRUSS架的主要材料。以下是对该材料选择的详细说明：材料名称材质优势6061 - T6铝合金6061 - T6具有较高的强度和良好的耐腐蚀性，能够满足TRUSS架在复杂环境下的使用要求。同时，该材料的加工性能良好，便于进行各种异型加工。</p><p id="0luhmkfl" extend="false" class="indent-1">为了确保材料的质量，我们会对材料供应商进行严格的资质审核，选择具有良好信誉和丰富经验的供应商。在材料检验与入库流程方面，我们制定了严格的标准和流程，确保每一批材料都符合要求。</p><h6 id="wennvx" extend="false" data-toc-id="wennvx">（1） 6061 - T6铝合金特性分析</h6><p id="8u8yebsn" extend="false" class="indent-1">6061 - T6铝合金是一种常见的铝合金材料，具有许多优良的特性。以下是对其特性的详细分析：特性描述高强度6061 - T6铝合金经过热处理后，具有较高的强度，能够承受较大的荷载，适用于TRUSS架等对强度要求较高的结构。良好的耐腐蚀性该铝合金表面能够形成一层致密的氧化膜，具有良好的耐腐蚀性，能够在潮湿、恶劣的环境下长期使用。易加工性6061 - T6铝合金具有良好的加工性能，易于进行切割、焊接、弯曲等加工操作，能够满足TRUSS架异型加工的需求。轻量化相比其他金属材料，6061 - T6铝合金的密度较小，重量较轻，便于运输和安装，同时也能够降低整个灯光系统的重量。</p><p id="gfw3oea3" extend="false" class="indent-1">基于以上特性，6061 - T6铝合金是TRUSS架材料的理想选择。我们将严格按照相关标准和要求，确保所使用的6061 - T6铝合金材料的质量。</p><h6 id="37tidx" extend="false" data-toc-id="37tidx">（2） 材料供应商资质审核</h6><p id="2girzwdi" extend="false" class="indent-1">材料供应商的资质直接关系到材料的质量和供应的稳定性。我们会对材料供应商进行严格的资质审核，确保其具备以下条件：具有合法的经营资质，能够提供有效的营业执照、税务登记证等相关证件；具有良好的信誉和口碑，在行业内有一定的知名度和美誉度；具有丰富的生产经验和先进的生产设备，能够保证材料的质量和生产效率；具有完善的质量控制体系，能够对原材料采购、生产过程、成品检验等环节进行严格的质量控制；能够提供优质的售后服务，及时解决客户在使用过程中遇到的问题。</p><p id="c8sbxpgc" extend="false" class="indent-1">在审核过程中，我们会对供应商的生产场地、生产设备、质量控制体系等进行实地考察，同时还会查阅其相关的业绩资料和客户评价。只有通过严格审核的供应商，我们才会与其建立合作关系。</p><h6 id="w0arrh" extend="false" data-toc-id="w0arrh">（3） 材料检验与入库流程</h6><p id="p6t879w2" extend="false" class="indent-1">材料检验与入库流程是确保材料质量的重要环节。我们制定了严格的流程，具体如下：1. 材料到货后，首先核对送货单与采购合同的一致性，包括材料名称、规格、数量等信息。2. 对材料的外观进行检查，查看是否有划伤、变形、锈蚀等缺陷。3. 按照相关标准和要求，对材料的性能进行检验，如力学性能、化学成分等。4. 对于需要进行无损检测的材料，进行相应的检测，确保材料内部无缺陷。5. 检验合格的材料，办理入库手续，做好标识和记录，以便于管理和追溯。6. 对于检验不合格的材料，及时与供应商沟通，进行退货或换货处理。</p><p id="j0288mi6" extend="false" class="indent-1">通过严格的材料检验与入库流程，我们能够确保每一批材料都符合要求，为TRUSS架的加工质量提供保障。</p><h5 id="k1ibjo" extend="false" data-toc-id="k1ibjo">2、 TRUSS架尺寸精度</h5><p id="0s4d3pze" extend="false" class="indent-1">TRUSS架的尺寸精度是保证其安装和使用性能的关键因素。我们将严格控制TRUSS架的尺寸精度，确保其符合设计要求。具体措施如下：建立完善的尺寸精度控制体系，明确各环节的质量责任；采用先进的测量设备和技术，对TRUSS架的尺寸进行精确测量；加强对加工过程的监控，及时发现和纠正尺寸偏差；定期对测量设备进行校准和维护，确保测量结果的准确性。</p><p id="4kfsfnww" extend="false" class="indent-1">以下是TRUSS架尺寸精度的具体要求：主架尺寸精度要求控制在极小范围内，以保证整体结构的稳定性；斜管尺寸精度要求严格，确保与主架的连接紧密；接口精度要求极高，以保证各部件之间的完美配合。</p><h6 id="b3n2e6" extend="false" data-toc-id="b3n2e6">（1） 主架尺寸精度要求</h6><p id="14m7z49h" extend="false" class="indent-1">主架作为TRUSS架的主要承载结构，其尺寸精度要求非常严格。具体要求如下：1. 长度偏差控制在±[X]mm以内，以确保主架在安装过程中能够准确对接。2. 宽度偏差控制在±[X]mm以内，保证主架的稳定性和平衡性。3. 高度偏差控制在±[X]mm以内，使主架在垂直方向上保持一致。4. 对角线偏差控制在±[X]mm以内，确保主架的矩形度，避免出现扭曲变形。</p><p id="s0171phv" extend="false" class="indent-1">为了保证主架尺寸精度，我们将在加工过程中采用高精度的加工设备和工艺，同时加强对加工过程的质量检测。在每一道工序完成后，都会进行严格的尺寸测量，只有符合精度要求的主架才能进入下一道工序。</p><h6 id="0raq98" extend="false" data-toc-id="0raq98">（2） 斜管尺寸精度要求</h6><p id="bimcjkpj" extend="false" class="indent-1">斜管在TRUSS架中起到连接和支撑的作用，其尺寸精度直接影响到TRUSS架的整体性能。斜管的长度偏差应控制在极小范围内，以确保与主架和其他部件的连接紧密。管径的公差应符合设计要求，保证斜管的强度和稳定性。斜管的弯曲角度和弧度也需要精确控制，以保证其在TRUSS架中的安装位置准确。我们将采用先进的加工工艺和测量设备，对斜管的尺寸进行严格控制。在加工过程中，会对每一根斜管进行多次测量和调整，确保其尺寸精度符合要求。对于不符合精度要求的斜管，将进行返工处理，直至达到标准。</p><h6 id="hdpe1r" extend="false" data-toc-id="hdpe1r">（3） 接口精度要求</h6><p id="wpbd47wh" extend="false" class="indent-1">接口精度是TRUSS架各部件连接的关键，直接影响到整个结构的稳定性和安全性。接口的尺寸公差应严格控制，确保各部件之间能够紧密配合，无缝对接。接口的表面平整度和光洁度也有较高要求，以保证连接的可靠性。接口的角度和位置精度需要精确控制，避免因接口偏差导致的安装困难和结构变形。我们将采用高精度的加工设备和工艺，对接口进行精细加工。在加工完成后，会使用专业的测量工具对接口进行全面检测，确保其精度符合设计要求。同时，在安装过程中，也会对接口进行再次检查和调整，确保连接牢固。</p><h5 id="fvvdxk" extend="false" data-toc-id="fvvdxk">3、 TRUSS架特殊工艺</h5><p id="mxj93ioy" extend="false" class="indent-1">TRUSS架的特殊工艺是其实现异型加工和满足特殊需求的关键。我们将采用先进的加工技术和工艺，确保TRUSS架的特殊工艺达到高标准。具体包括：斜管接口加工技术，采用先进的焊接和切割工艺，确保接口的强度和精度；四面斜管加工工艺，运用高精度的折弯和成型设备，保证四面斜管的形状和尺寸符合要求；铝板接口加固措施，采用合理的加固方式，提高铝板接口的稳定性和可靠性。</p><p id="qhfksgkv" extend="false" class="indent-1">为了保证特殊工艺的质量，我们将加强对加工过程的监控和管理，严格执行相关的工艺标准和操作规程。同时，会不断引进新的技术和设备，提高特殊工艺的加工水平。</p><h6 id="p69yvh" extend="false" data-toc-id="p69yvh">（1） 斜管接口加工技术</h6><p id="5gy4tyfi" extend="false" class="indent-1">斜管接口加工技术是TRUSS架加工中的关键环节。为了确保接口的质量，我们将采用以下技术和措施：1. 采用先进的切割设备，确保斜管切割面的平整度和垂直度，减少切割误差。2. 运用高精度的焊接工艺，保证接口的焊接质量，提高接口的强度和稳定性。3. 在焊接前，对斜管接口进行清洁和预处理，去除表面的油污、氧化层等杂质，确保焊接效果。4. 焊接过程中，采用合适的焊接参数和焊接顺序，控制焊接变形，保证接口的精度。5. 焊接完成后，对接口进行探伤检测，检查焊缝内部是否存在缺陷，确保接口质量符合要求。6. 对接口进行打磨和抛光处理，提高接口的表面光洁度，使其外观更加美观。</p><p id="vdguy8b0" extend="false" class="indent-1">通过以上技术和措施，我们能够保证斜管接口的加工质量，为TRUSS架的整体性能提供保障。</p><h6 id="zcjr5x" extend="false" data-toc-id="zcjr5x">（2） 四面斜管加工工艺</h6><p id="7k2vkg25" extend="false" class="indent-1">四面斜管加工工艺对于TRUSS架的外观和性能至关重要。以下是我们的四面斜管加工工艺：工艺步骤工艺描述材料准备选用符合要求的6061 - T6铝合金管材，对管材进行外观检查和尺寸测量，确保材料质量合格。切割下料根据设计要求，使用高精度的切割设备将管材切割成所需的长度，保证切割精度。折弯成型采用先进的折弯设备和工艺，按照设计的角度和弧度对管材进行折弯，确保四面斜管的形状符合要求。焊接连接对四面斜管的接口进行焊接，采用合适的焊接工艺和参数，保证焊接质量和接口强度。表面处理对加工好的四面斜管进行表面处理，如打磨、抛光、喷涂等，提高其表面质量和耐腐蚀性。</p><p id="tkkbr8yl" extend="false" class="indent-1">在整个加工过程中，我们将严格控制每一个环节的质量，确保四面斜管的加工精度和质量达到高标准。</p><h6 id="bf3c4i" extend="false" data-toc-id="bf3c4i">（3） 铝板接口加固措施</h6><p id="s5xiyqxh" extend="false" class="indent-1">铝板接口加固措施是提高TRUSS架稳定性和安全性的重要手段。我们将采取以下措施对铝板接口进行加固：1. 采用高强度的螺栓连接，确保铝板与其他部件之间的连接牢固。在选择螺栓时，会根据铝板的厚度和受力情况，选择合适的规格和强度等级。2. 在铝板接口处添加加强筋，增加接口的强度和刚度。加强筋的形状和尺寸将根据具体的设计要求进行确定。3. 对铝板接口进行焊接加固，提高接口的整体性和稳定性。焊接时会采用合适的焊接工艺和参数，确保焊接质量。4. 在铝板接口表面涂抹密封胶，防止水分和灰尘进入接口内部，影响接口的使用寿命。5. 对加固后的铝板接口进行定期检查和维护，及时发现和处理可能出现的问题。</p><p id="pnpp2anr" extend="false" class="indent-1">通过以上加固措施，我们能够有效提高铝板接口的强度和稳定性，确保TRUSS架的安全使用。</p><h4 id="6skstr" extend="false" data-toc-id="6skstr">（二）、电源柜电气检测</h4><p id="etp1oxyd" extend="false" class="indent-1">电源柜作为《2025年春节晚会》灯光设备的重要组成部分，其电气性能直接关系到整个灯光系统的安全和稳定运行。我们将对电源柜进行全面的电气检测，确保其符合相关标准和要求。具体检测内容包括电气性能检测、安全性检测和功能性检测。通过严格的检测，能够及时发现电源柜存在的问题，并采取相应的措施进行整改，保证电源柜的质量和性能。</p><h5 id="hg6onr" extend="false" data-toc-id="hg6onr">1、 电源柜电气性能检测</h5><p id="zf7esezh" extend="false" class="indent-1">电源柜电气性能检测是确保其正常运行的关键。以下是我们进行电源柜电气性能检测的详细内容：检测项目检测标准检测方法电压稳定性电压波动范围在±[X]%以内使用电压表进行实时监测，记录不同时间段的电压值，计算电压波动范围。电流承载能力能够承受设计规定的最大电流，且在长时间运行过程中不出现过热现象通过加载模拟负载，测量电源柜在不同电流下的温度变化，判断其电流承载能力。功率因数功率因数应达到[X]以上使用功率因数表进行测量，确保电源柜的电能利用效率。绝缘电阻绝缘电阻应不低于[X]MΩ使用绝缘电阻测试仪对电源柜的各电气回路进行测量，检查绝缘性能。</p><p id="szk69ds0" extend="false" class="indent-1">在检测过程中，我们将严格按照相关标准和要求进行操作，确保检测结果的准确性和可靠性。对于检测不合格的电源柜，将进行进一步的排查和维修，直至其电气性能符合要求。</p><h5 id="29j48x" extend="false" data-toc-id="29j48x">2、 电源柜安全性检测</h5><p id="v5uec652" extend="false" class="indent-1">电源柜安全性检测是保障人员和设备安全的重要措施。我们将从以下几个方面对电源柜进行安全性检测：1. 接地电阻检测：检查电源柜的接地是否良好，接地电阻应符合相关标准要求。使用接地电阻测试仪进行测量，确保接地电阻不超过规定值。2. 短路保护功能检测：测试电源柜的短路保护装置是否能够在短路发生时及时切断电路，防止设备损坏和人员伤亡。通过模拟短路故障，检查短路保护装置的动作情况。3. 过载保护功能检测：验证电源柜的过载保护装置是否能够在设备过载时自动切断电源，避免设备因过载而损坏。通过加载过载电流，检查过载保护装置的动作时间和可靠性。4. 漏电保护功能检测：检测电源柜的漏电保护装置是否能够及时检测到漏电情况，并切断电源。使用漏电测试仪进行测试，确保漏电保护装置的灵敏度和可靠性。5. 防护等级检测：检查电源柜的防护等级是否符合设计要求，能够有效防止灰尘、水等进入柜内，保证设备的正常运行。通过观察和测量，判断防护等级是否达标。</p><p id="iicdrnsc" extend="false" class="indent-1">通过以上安全性检测，我们能够及时发现电源柜存在的安全隐患，并采取相应的措施进行整改，确保电源柜的安全可靠运行。</p><h5 id="ixh4ik" extend="false" data-toc-id="ixh4ik">3、 电源柜功能性检测</h5><p id="d18rht1h" extend="false" class="indent-1">电源柜功能性检测是确保其满足实际使用需求的重要环节。我们将对电源柜的各项功能进行全面检测，具体如下：1. 开关操作功能检测：检查电源柜的开关是否能够正常操作，分合闸指示是否准确。通过多次操作开关，观察其动作情况和指示状态。2. 指示灯功能检测：验证电源柜的指示灯是否能够正常亮起，准确指示设备的运行状态。检查指示灯的亮度和颜色是否符合要求。3. 报警功能检测：测试电源柜的报警装置是否能够在设备出现异常情况时及时发出报警信号。模拟各种异常情况，检查报警装置的响应情况。4. 通信功能检测：对于具备通信功能的电源柜，检测其通信接口是否正常工作，数据传输是否准确可靠。通过连接通信设备，进行数据传输测试。5. 远程控制功能检测：如果电源柜支持远程控制，检测其远程控制功能是否能够正常实现。通过远程控制设备，对电源柜进行操作，检查其响应情况。</p><p id="8uo2v8zn" extend="false" class="indent-1">通过以上功能性检测，我们能够确保电源柜的各项功能正常运行，满足《2025年春节晚会》灯光设备的使用需求。</p><h4 id="mqmsv2" extend="false" data-toc-id="mqmsv2">（三）、电缆阻燃性能全检</h4><p id="elijupjw" extend="false" class="indent-1">电缆作为《2025年春节晚会》灯光设备的重要连接部件，其阻燃性能直接关系到整个演出的安全。我们将对电缆进行全面的阻燃性能检测，确保其符合相关标准和要求。具体检测内容包括阻燃电缆特性分析、电缆电气性能检测和电缆外观及结构检测。通过严格的检测，能够保证电缆在火灾发生时具有良好的阻燃性能，减少火灾蔓延的风险，为演出的安全提供保障。</p><table id="qph4eomt" extend="false" style="min-width: 25px"><colgroup><col style="min-width: 25px"></colgroup><tbody><tr id="lcm966u2" extend="false"><td colspan="1" rowspan="1" style="border: 0.5px solid #ccc; padding: 0px;"><img id="5lc1pgxe" extend="false" vnode="true" type="image" src="https://lianqiai-public.oss-accelerate.aliyuncs.com/lianqiai/ai-compose/images/65274ac8ea4b826b8ba13a2e80894d5d.jpeg" width="261" height="200" left="0" top="0" draggable="false" rotatable="false" equalproportion="true" flipx="false" flipy="false" uploaded="false" error="false" previewtype="image"></td></tr><tr id="yu2drd30" extend="false"><td colspan="1" rowspan="1" style="border: 0.5px solid #ccc; padding: 3px;"><p id="bzkrr36j" extend="false" style="text-align: center">电缆</p></td></tr></tbody></table><h5 id="h4sf1w" extend="false" data-toc-id="h4sf1w">1、 阻燃电缆特性分析</h5><p id="kh4cq6hi" extend="false" class="indent-1">阻燃电缆具有许多独特的特性，以下是对其特性的详细分析：特性描述阻燃性阻燃电缆在遇到火源时，能够自行熄灭，不会持续燃烧，有效阻止火灾蔓延。其阻燃等级通常符合相关国家标准。低烟性在燃烧过程中，阻燃电缆产生的烟雾量较少，减少了烟雾对人员和设备的危害，便于人员疏散和消防救援。无卤性阻燃电缆不含有卤素元素，燃烧时不会产生有毒的卤化氢气体，降低了对环境和人体的危害。耐腐蚀性具有良好的耐腐蚀性，能够在潮湿、恶劣的环境下长期使用，保证电缆的使用寿命。电气性能稳定在正常使用和火灾情况下，阻燃电缆的电气性能能够保持稳定，确保电力传输的可靠性。</p><p id="axmz96qj" extend="false" class="indent-1">基于以上特性，阻燃电缆是《2025年春节晚会》灯光设备的理想选择。我们将严格按照相关标准和要求，对阻燃电缆进行检测，确保其质量和性能。</p></page>',
    characterLimit: 10000
  },
  page: {
    showBookmark: true,
    showBreakMarks: false,
  },
  view: {
    painter: {
      enabled: false,
    }
  },
  templates,
  cdnUrl: 'https://cdn.umodoc.com',
  shareUrl: 'https://umodoc.com',
  file: {
    // allowedMimeTypes: [
    //   'application/pdf',
    //   'image/svg+xml',
    //   'video/mp4',
    //   'audio/*',
    // ],
  },
  ai: {
    assistant: {
      enabled: true,
      async onMessage() {
        return await Promise.resolve('<p>AI助手测试</p>')
      },
    },
  },
  user: {
    id: 'umoeditor',
    label: 'Umo Editor',
    avatar: 'https://tdesign.gtimg.com/site/avatar.jpg',
  },
  users: [
    { id: 'umodoc', label: 'Umo Team' },
    { id: 'Cassielxd', label: 'Cassielxd' },
    { id: 'Goldziher', label: "Na'aman Hirschfeld" },
    { id: 'SerRashin', label: 'SerRashin' },
    { id: 'ChenErik', label: 'ChenErik' },
    { id: 'china-wangxu', label: 'china-wangxu' },
    { id: 'Sherman Xu', label: 'xuzhenjun130' },
    { id: 'testuser', label: '测试用户' },
  ],
  async onSave(content: string, page: number, document: { content: string }) {
    localStorage.setItem('document.content', document.content)
    return new Promise((resolve, reject) => {
      const success = true
      if (success) {
        console.log('onSave', { content, page, document })
        resolve('操作成功')
      } else {
        reject(new Error('操作失败'))
      }
    })

  },
  async onFileUpload(file: File & { url?: string }) {
    if (!file) {
      throw new Error('没有找到要上传的文件')
    }
    // await new Promise((resolve) => setTimeout(resolve, 3000))
    console.log({
      id: shortId(),
      url: file.url ?? URL.createObjectURL(file),
      name: file.name,
      type: file.type,
      size: file.size,
    })
    return {
      id: shortId(),
      url: file.url ?? URL.createObjectURL(file),
      name: file.name,
      type: file.type,
      size: file.size,
    }
  },
  onFileDelete(id: string, url: string) {
    console.log(id, url)
  },
  onCustomEChartSettings(data: any, config: any) {
    return null
  },
  async onCustomImportWordMethod() {
    return await Promise.resolve({
      value: '<p>测试导入word</p>',
    })
  },
})
</script>

<style>
html,
body {
  padding: 0;
  margin: 0;
}

.examples {
  margin: 20px;
  display: flex;
  height: calc(100vh - 40px);
}

.box {
  border: solid 1px #ddd;
  box-sizing: border-box;
  position: relative;
  width: 100%;
  height: 100%;
}

html,
body {
  height: 100vh;
  overflow: hidden;
}
</style>
