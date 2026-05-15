/**
 * 长安风物志 - 商品详情页脚本
 * 依赖：Storage、Toast、Auth 模块
 * 功能：读取 URL 参数 | 数量增减 | Tab 切换 | 收藏 | 加入购物车 | 动态渲染描述/参数/评价
 */

document.addEventListener('DOMContentLoaded', function () {

  // ==================== 读取 URL 参数 ====================
  var urlParams = new URLSearchParams(window.location.search);
  var productId = parseInt(urlParams.get('id')) || 1;

  // ==================== 全部16个商品完整数据 ====================
  var products = {
    1: {
      name: '锦绣团扇 · 花鸟卷', category: '团扇', price: 128, origPrice: 256,
      brief: '手工苏绣双面团扇，丝线细腻栩栩如生', img: '../images/products/product1.jpg',
      desc: '<p>此款锦绣团扇 · 花鸟卷由苏州资深绣娘手工绣制，选用上等真丝面料与湘妃竹扇柄。双面绣工艺精湛，正反两面图案各异却同样精细，花鸟图案栩栩如生。扇面直径约21厘米，扇柄长约15厘米，配精美流苏装饰。既是夏日纳凉佳品，也是中式家居装饰的绝佳选择，送礼自用两相宜。</p><p>每一把团扇都经过设计、描稿、绣制、装裱等十几道工序，单把扇子的绣制周期约为5-7天。我们坚持传统手工艺，拒绝机器量产，让每一件作品都独一无二。</p><div class="tab-image-placeholder"></div>',
      specs: [
        ['品牌','长安风物志'],['材质','真丝 / 湘妃竹'],['工艺','苏绣双面绣'],
        ['尺寸','扇面直径21cm / 柄长15cm'],['重量','约80g'],['包装','锦盒礼盒装'],
        ['产地','江苏苏州'],['适用场景','日常使用 / 家居装饰 / 礼品馈赠']
      ],
      reviews: [
        ['★★★★★','团扇做工非常精美，刺绣细腻，拿在手里很有质感。送妈妈的生日礼物，她特别喜欢！','林女士 · 2026年3月'],
        ['★★★★★','已经是第二次购买了，这次送给外国朋友，他们对中国传统手工艺赞不绝口。','张先生 · 2026年2月'],
        ['★★★★☆','扇子很美，包装也很精致。如果能再多一些图案选择就更好了。','王女士 · 2026年1月']
      ]
    },
    2: {
      name: '沉香木雕花香囊', category: '香囊', price: 89, origPrice: null,
      brief: '天然沉香木手工雕刻，暗香浮动安神养心', img: '../images/products/product2.jpg',
      desc: '<p>此款沉香木雕花香囊选用天然沉香木整料手工镂雕而成，香囊球体表面雕刻盛放的牡丹花纹，花瓣层层叠叠于木质纹理间若隐若现。内置天然沉香粉与干花混合香料，香气清雅持久，缓缓释放可达数月。香囊直径约5厘米，配手工编织如意结与流苏坠饰，可悬挂于衣襟、包袋、车内或床头。</p><p>每一枚香囊均由福建木雕匠人手工雕琢，从选料、开胚、镂空、打磨到填香，历经八道工序，单枚制作周期约3天。木纹与雕工各有微妙差异，件件皆是孤品。</p><div class="tab-image-placeholder"></div>',
      specs: [
        ['品牌','长安风物志'],['材质','天然沉香木'],['工艺','手工镂雕'],
        ['尺寸','直径约5cm'],['重量','约35g'],['包装','锦袋礼盒装'],
        ['产地','福建莆田'],['适用场景','随身佩香 / 车内悬挂 / 礼品馈赠']
      ],
      reviews: [
        ['★★★★★','沉香木的天然香气非常舒服，不是那种刺鼻的香水味。挂在床头，每晚伴着淡淡木香入睡。','陈女士 · 2026年3月'],
        ['★★★★★','雕工真的太精细了，放大镜看花瓣纹理都清清楚楚。送给闺蜜的乔迁礼物，她爱不释手。','赵女士 · 2026年2月'],
        ['★★★★☆','香气比想象中淡雅，喜欢浓香的朋友可能需要适应一下。但木质手感温润，越盘越有光泽。','刘先生 · 2026年1月']
      ]
    },
    3: {
      name: '白玉兰花发簪', category: '发簪', price: 156, origPrice: null,
      brief: '天然白玉精雕兰花，温润典雅步摇生姿', img: '../images/products/product3.jpg',
      desc: '<p>此款白玉兰花发簪选用天然和田白玉为主材，簪头手工雕刻一朵半开的白玉兰花，花瓣饱满圆润，花蕊处以黄铜点蕊。簪身采用黄铜鎏金工艺，錾刻回纹装饰，线条流畅秀美。全长约18厘米，簪头花径约3厘米，重量适中，盘发稳固不坠发。</p><p>每一支发簪均由扬州玉雕师傅手工琢刻，玉料天然纹理各有不同，或带絮或飘花，件件独特。配素色锦盒包装，自用优雅，馈赠体面。</p><div class="tab-image-placeholder"></div>',
      specs: [
        ['品牌','长安风物志'],['材质','和田白玉 / 黄铜鎏金'],['工艺','手工玉雕 / 鎏金'],
        ['尺寸','全长18cm / 花径3cm'],['重量','约45g'],['包装','素色锦盒装'],
        ['产地','江苏扬州'],['适用场景','汉服搭配 / 日常盘发 / 礼品馈赠']
      ],
      reviews: [
        ['★★★★★','玉兰花雕得非常灵动，白玉温润有光泽，配汉服出门回头率超高！','周女士 · 2026年3月'],
        ['★★★★★','送给女朋友的周年礼物，她说这是她收到过最用心的发簪。鎏金部分做得也很精致。','吴先生 · 2026年2月'],
        ['★★★★☆','簪子很美，但比想象中小巧一些，适合发量适中的女生。','郑女士 · 2026年1月']
      ]
    },
    4: {
      name: '青瓷茶具套装', category: '茶具', price: 268, origPrice: null,
      brief: '龙泉青瓷一壶四杯，釉色温润如雨后初晴', img: '../images/products/product4.jpg',
      desc: '<p>此款青瓷茶具套装以龙泉青瓷传统工艺烧制，釉色温润如美玉，呈淡淡粉青色调。套装包含一壶、四杯、一茶海、一盖置，共七件。壶身线条饱满流畅，壶嘴出水如注，断水利落；茶杯口沿微撇，贴合唇感；茶海敞口宽腹，便于观汤色。整套茶具置于茶席之上，素雅清丽，自成一景。</p><p>每一套茶具均由龙泉匠人手工拉坯修坯，经1300度高温还原焰烧成，釉面开片自然如冰裂纹，使用愈久，茶汤浸润纹路愈显，是为「养器」之趣。</p><div class="tab-image-placeholder"></div>',
      specs: [
        ['品牌','长安风物志'],['材质','龙泉青瓷'],['工艺','手工拉坯 / 高温还原烧'],
        ['尺寸','壶容量280ml / 杯容量50ml'],['重量','约1.2kg（全套）'],['包装','锦盒礼盒装'],
        ['产地','浙江龙泉'],['适用场景','功夫茶 / 茶席陈列 / 礼品馈赠']
      ],
      reviews: [
        ['★★★★★','釉色真的绝了，粉青温润，摆在那里就是一件艺术品。泡了几次茶，手感越来越喜欢。','黄先生 · 2026年3月'],
        ['★★★★★','买来送领导的退休礼，他爱喝茶，收到后专门打电话来夸釉色漂亮、出水顺畅。','孙女士 · 2026年2月'],
        ['★★★★☆','整体很满意，就是壶的容量稍小，一个人独饮刚好，人多需要频繁续水。','杨先生 · 2026年1月']
      ]
    },
    5: {
      name: '宫灯夜明 · 六角纱灯', category: '灯笼', price: 198, origPrice: null,
      brief: '传统六角宫灯造型，柔光映照营造古风意境', img: '../images/products/product5.jpg',
      desc: '<p>此款六角纱灯以传统宫灯形制为蓝本，灯架选用老楠竹手工榫卯拼接，六角端正，结构稳固。灯面蒙以双层素色真丝绢纱，透光柔和温润，点亮后光线透过绢纱漫射开来，满室生暖。灯身上下饰以手工錾刻黄铜云纹角花，底部垂挂绛红流苏。灯体高约35厘米，对角宽约22厘米，内置LED暖光灯源，USB供电，安全便捷。</p><p>每一盏纱灯均由浙江灯彩匠人手工扎制，从选竹、烘弯、打眼、拼架到蒙纱、装饰，经二十余道工序，单盏制作周期约4天。夜幕降临时点亮一盏，仿佛回到了长安上元夜的灯火阑珊处。</p><div class="tab-image-placeholder"></div>',
      specs: [
        ['品牌','长安风物志'],['材质','老楠竹 / 真丝绢纱 / 黄铜'],['工艺','手工扎制 / 榫卯拼接 / 錾刻'],
        ['尺寸','高35cm / 对角宽22cm'],['重量','约350g'],['光源','LED暖光 / USB供电'],
        ['包装','锦盒礼盒装'],['产地','浙江海宁'],['适用场景','家居装饰 / 茶室氛围 / 节庆布置']
      ],
      reviews: [
        ['★★★★★','太美了！晚上点亮之后光线透过绢纱特别温柔，整个房间氛围都不一样了。','林先生 · 2026年3月'],
        ['★★★★★','朋友来家里喝茶看到这盏灯，当场就问链接。传统手艺加上现代USB供电，实用又美观。','何女士 · 2026年2月'],
        ['★★★★☆','做工精致，就是绢纱比较娇贵，家里有猫的朋友要放高一点哈哈。','马女士 · 2026年1月']
      ]
    },
    6: {
      name: '兰亭序黄铜书签', category: '书签', price: 58, origPrice: null,
      brief: '蚀刻《兰亭集序》全文，黄铜做旧古意盎然', img: '../images/products/product6.jpg',
      desc: '<p>此款兰亭序黄铜书签以《兰亭集序》为灵感，书签正面以蚀刻工艺精刻王羲之行书「群贤毕至，少长咸集」八字，笔意流转，气韵生动。书签尾端镂空雕刻流云纹，可穿配手工编绳流苏坠饰。材质选用优质黄铜，表面做旧处理，呈现温润古雅的哑光质感。长约12厘米，宽约2.5厘米，厚度适中，夹入书页不伤纸张。</p><p>每一枚书签均经蚀刻、打磨、做旧、抛光等多道工序处理，铜色经久不褪，使用愈久愈显包浆之美。</p><div class="tab-image-placeholder"></div>',
      specs: [
        ['品牌','长安风物志'],['材质','优质黄铜'],['工艺','蚀刻 / 做旧 / 手工打磨'],
        ['尺寸','长12cm / 宽2.5cm'],['重量','约25g'],['包装','素色卡纸礼盒装'],
        ['产地','安徽宣城'],['适用场景','日常阅读 / 手账搭配 / 礼品馈赠']
      ],
      reviews: [
        ['★★★★★','黄铜做旧的质感特别棒，配上兰亭序的文字，每次翻开书都多了一分仪式感。','朱先生 · 2026年3月'],
        ['★★★★★','买了两枚，一枚自用一枚送书法老师，老师很喜欢，说这是「文人该用的书签」。','胡女士 · 2026年2月'],
        ['★★★★☆','书签很有质感，就是流苏稍微有点容易打结，自己重新编了一下就好了。','徐先生 · 2026年1月']
      ]
    },
    7: {
      name: '文房四宝礼盒套装', category: '文房', price: 388, origPrice: null,
      brief: '湖笔徽墨宣纸端砚，雅士书房必备之选', img: '../images/products/product7.jpg',
      desc: '<p>此款文房四宝礼盒套装集笔、墨、纸、砚于一体，精选四件文房雅器：狼毫小楷毛笔一支，笔锋劲健，聚锋不散；徽墨松烟墨锭一方，墨色黑亮，落纸有淡淡松香；手工宣纸小笺一叠二十张，纸质绵韧，吸墨不洇；端石小砚一方，石质温润，下发墨俱佳。四宝汇于一匣，匣面嵌黄铜云纹角花，内衬素色软缎，开匣即是一席文人风景。</p><p>每一套礼盒均经匠人手选配搭，笔墨纸砚各有来历——笔出湖州，墨出徽州，纸出泾县，砚出肇庆，四方之物汇于一匣，是为「文房四宝」真意。</p><div class="tab-image-placeholder"></div>',
      specs: [
        ['品牌','长安风物志'],['材质','狼毫 / 松烟墨 / 手工宣纸 / 端石'],['工艺','手工制作（笔/墨/纸/砚）'],
        ['尺寸','礼盒约30×20×8cm'],['重量','约1.5kg（全套）'],['包装','锦缎面礼盒装'],
        ['产地','笔湖州/墨徽州/纸泾县/砚肇庆'],['适用场景','书法练习 / 文房收藏 / 高端馈赠']
      ],
      reviews: [
        ['★★★★★','送给父亲退休后的礼物，他打开盒子的时候眼眶都红了。笔墨纸砚样样精致，物超所值。','高先生 · 2026年3月'],
        ['★★★★★','砚台的石质非常好，磨墨顺畅不滞笔。宣纸也绵韧，写字手感一流。','段女士 · 2026年2月'],
        ['★★★★☆','礼盒很有档次，送人体面。就是墨锭稍微小了一点，练字频繁的话需要再配一块。','钱先生 · 2026年1月']
      ]
    },
    8: {
      name: '青花瓷古风摆件', category: '摆件', price: 168, origPrice: null,
      brief: '景德镇手工青花，案头雅物增添文人气息', img: '../images/products/product8.jpg',
      desc: '<p>此款青花瓷古风摆件以景德镇高白泥手工拉坯成型，瓶身圆润饱满，通体施甜白釉为底，釉面光洁如凝脂。瓶腹以青花料手绘缠枝莲纹，笔触流畅自然，青花发色浓淡有致，深蓝与洁白交相辉映。摆件高约18厘米，腹径约10厘米，底部落有「长安风物志」青花底款。置于案头、博古架或茶席一角，素雅清丽，满室生幽。</p><p>每一件青花摆件均由景德镇画师手工绘制，纹样各有微妙变化，烧成后的青花呈色亦有深浅之别，件件不同，皆为孤品。</p><div class="tab-image-placeholder"></div>',
      specs: [
        ['品牌','长安风物志'],['材质','高白泥 / 青花料 / 甜白釉'],['工艺','手工拉坯 / 手绘青花 / 高温烧制'],
        ['尺寸','高18cm / 腹径10cm'],['重量','约400g'],['包装','锦盒礼盒装'],
        ['产地','江西景德镇'],['适用场景','家居摆设 / 博古架陈列 / 礼品馈赠']
      ],
      reviews: [
        ['★★★★★','青花发色太美了，浓淡过渡特别自然。放在书架上，整个房间都多了几分文气。','叶女士 · 2026年3月'],
        ['★★★★★','买来送客户的伴手礼，包装体面，瓷器本身也拿得出手。客户还特意发消息说很喜欢。','方先生 · 2026年2月'],
        ['★★★★☆','造型素雅百搭，就是比想象中小巧一些，买之前建议看好尺寸。','沈女士 · 2026年1月']
      ]
    },
    9: {
      name: '苏绣真丝方巾', category: '团扇', price: 238, origPrice: 476,
      brief: '苏州绣娘手工刺绣，百蝶穿花图案', img: '../images/products/product9.jpg',
      desc: '<p>此款苏绣真丝方巾选用100%桑蚕丝素绉缎为底料，面料柔滑细腻，光泽温润如珠。方巾一角以苏绣工艺手工绣制蝶恋花图案——粉蝶翩跹于牡丹之上，丝线配色雅致，针法细腻多变，套针与滚针交替运用，蝶翅薄透、花瓣层叠皆栩栩如生。方巾尺寸约65×65厘米，四边手工卷边，针脚细密匀整。可作披肩、包饰或裱框挂画，一巾多用。</p><p>每一条方巾均由苏州绣娘耗费约3天时间绣制完成，丝线色彩过渡自然，绣面平整无褶皱，体现苏绣「平、齐、细、密、匀、顺、和、光」八字精髓。</p><div class="tab-image-placeholder"></div>',
      specs: [
        ['品牌','长安风物志'],['材质','100%桑蚕丝'],['工艺','苏绣手工刺绣 / 手工卷边'],
        ['尺寸','65×65cm'],['重量','约60g'],['包装','素色礼盒装'],
        ['产地','江苏苏州'],['适用场景','日常佩戴 / 裱框装饰 / 礼品馈赠']
      ],
      reviews: [
        ['★★★★★','真丝的光泽太高级了，刺绣那朵牡丹每次展开都忍不住多看几眼。春天配风衣出门，被好几个人夸。','秦女士 · 2026年3月'],
        ['★★★★★','送给妈妈当母亲节礼物，她舍不得戴，裱框挂在了卧室墙上，说每天看到就开心。','许女士 · 2026年2月'],
        ['★★★★☆','方巾很美，但真丝确实需要小心打理，建议配一条洗涤说明就更贴心了。','冯女士 · 2026年1月']
      ]
    },
    10: {
      name: '宜兴紫砂西施壶', category: '茶具', price: 458, origPrice: 916,
      brief: '原矿紫泥手工拉坯，泡茶隔夜不馊', img: '../images/products/flash2.jpg',
      desc: '<p>此款紫砂西施壶以宜兴黄龙山原矿紫泥为料，由宜兴资深陶艺师全手工拍打成型。壶身圆润饱满，如美人丰腴；短嘴倒把，线条流畅一气呵成；壶盖与壶口严丝合缝，转动滑畅无声；壶钮作扁圆形，拿捏舒适。容量约200毫升，适泡乌龙、普洱等功夫茶。紫砂壶透气不闷茶，使用愈久，壶身愈显温润包浆，茶香亦渐入壶胎，是为「养壶」之乐。</p><p>每一把西施壶均为全手工制作，从炼泥、拍身筒、装嘴把到明针修整，经十余道工序，单把制作周期约5-7天。壶底钤印作者款识，一壶一印，件件可溯。</p><div class="tab-image-placeholder"></div>',
      specs: [
        ['品牌','长安风物志'],['材质','黄龙山原矿紫泥'],['工艺','全手工拍打成型'],
        ['尺寸','容量约200ml'],['重量','约180g'],['包装','锦盒礼盒装'],
        ['产地','江苏宜兴'],['适用场景','功夫茶 / 茶器收藏 / 礼品馈赠']
      ],
      reviews: [
        ['★★★★★','泥料非常好，手感温润，泡了几次普洱之后壶身已经开始有光泽了。养壶的过程本身就是一种享受。','蔡先生 · 2026年3月'],
        ['★★★★★','西施壶造型圆润可爱，出水顺畅，断水利落。200ml的容量一个人喝茶刚刚好。','丁女士 · 2026年2月'],
        ['★★★★☆','壶很不错，但新手可能需要注意紫砂壶的开壶和保养方法，建议附一张养护小卡片。','魏先生 · 2026年1月']
      ]
    },
    11: {
      name: '手工竹编灯笼', category: '灯笼', price: 98, origPrice: 196,
      brief: '非遗竹编工艺，暖黄灯光营造中式浪漫', img: '../images/products/flash3.jpg',
      desc: '<p>此款手工竹编灯笼以浙江安吉五年以上老竹为骨，经破篾、刮青、蒸煮、晾晒后，由匠人手工编织成浑圆灯笼骨架。竹篾粗细均匀，编织纹路疏密有致，灯光透出时竹影斑驳，极富东方韵味。内置LED暖光灯珠，USB供电安全节能，也可替换为小茶蜡营造烛光氛围。灯笼直径约20厘米，顶部系手工编绳，可悬挂或手提，底部垂挂短流苏装饰。</p><p>每一盏竹编灯笼均由浙江竹编匠人手工编织，竹篾根根过手，从破竹到成灯需经十二道工序。竹丝纵横交错间，是千年的指尖技艺传承。</p><div class="tab-image-placeholder"></div>',
      specs: [
        ['品牌','长安风物志'],['材质','安吉老竹 / 黄铜配件'],['工艺','手工破篾 / 手工编织'],
        ['尺寸','直径约20cm'],['重量','约200g'],['光源','LED暖光 / USB供电'],
        ['包装','素色礼盒装'],['产地','浙江安吉'],['适用场景','家居装饰 / 庭院悬挂 / 节庆氛围']
      ],
      reviews: [
        ['★★★★★','竹编纹理在灯光下的投影太绝了，整面墙都是斑驳的竹影。中秋那天挂起来，一家人喝茶赏灯，很有仪式感。','沈先生 · 2026年3月'],
        ['★★★★★','手工艺的温度是机器做不出来的，每一根竹篾都能看到匠人的用心。打算再买一盏送给朋友。','蒋女士 · 2026年2月'],
        ['★★★★☆','灯笼很美，但竹子天然材质会有少量毛刺，拿的时候要稍微注意一下。','潘先生 · 2026年1月']
      ]
    },
    12: {
      name: '唐风仕女陶俑', category: '摆件', price: 328, origPrice: 656,
      brief: '复刻唐代仕女俑，丰腴华贵尽显盛唐气象', img: '../images/products/flash4.jpg',
      desc: '<p>此款唐风仕女陶俑以唐代仕女画为灵感，陶艺师手工塑形雕刻，再现大唐盛世的丰腴之美。仕女头梳高髻，面如满月，身披齐胸襦裙，体态雍容华贵，眉目间带着盛唐特有的从容气度。陶俑采用低温素烧工艺，表面呈现哑光陶土本色，不施彩釉，保留泥料的天然质感与手工痕迹。高约22厘米，底部平稳可自立，配素色底座。</p><p>每一尊仕女陶俑均为手工捏塑，从塑形、修光到素烧，经七道工序。面部的微笑、衣纹的褶皱各有微妙差异，件件皆是独一无二的艺术品。</p><div class="tab-image-placeholder"></div>',
      specs: [
        ['品牌','长安风物志'],['材质','优质陶土'],['工艺','手工捏塑 / 素烧'],
        ['尺寸','高约22cm'],['重量','约500g'],['包装','锦盒礼盒装'],
        ['产地','河南洛阳'],['适用场景','家居摆设 / 博古架陈列 / 礼品馈赠']
      ],
      reviews: [
        ['★★★★★','这尊仕女的气质太好了，安静地站在书架上，每次看到都觉得内心平静。唐代审美真的高级。','韩女士 · 2026年3月'],
        ['★★★★★','送给学艺术史的朋友，她说这件陶俑抓住了唐俑的神韵——丰腴而不臃肿，雍容而不浮夸。','董先生 · 2026年2月'],
        ['★★★★☆','整体很满意，如果底座能做成更精致的木质底座就更完美了。','萧女士 · 2026年1月']
      ]
    },
    13: {
      name: '金丝楠木书签', category: '书签', price: 78, origPrice: null,
      brief: '金丝楠木手工打磨，木纹瑰丽温润', img: '../images/products/product13.jpg',
      desc: '<p>此款金丝楠木书签选用四川金丝楠木老料，木纹中天然含有金色丝状结晶，在光线下隐隐闪动，如金丝游走于木纹之间。书签造型修长简洁，线条流畅，通体手工打磨至丝滑触感，边缘圆润不伤书页。长约14厘米，宽约3厘米，厚度约2毫米，轻而坚韧。尾部钻孔穿以手工编绳，结一枚小巧如意结。金丝楠木自带幽幽木香，翻阅书页时清香缕缕，更添阅读雅趣。</p><p>每一枚书签均由木作匠人手工切割打磨，木纹走向与金丝分布各有不同，件件天然独特。长期使用后，木质表面会形成温润包浆，金丝愈发明显，愈用愈珍贵。</p><div class="tab-image-placeholder"></div>',
      specs: [
        ['品牌','长安风物志'],['材质','金丝楠木老料'],['工艺','手工切割 / 手工打磨'],
        ['尺寸','长14cm / 宽3cm'],['重量','约18g'],['包装','素色卡纸礼盒装'],
        ['产地','四川雅安'],['适用场景','日常阅读 / 手账搭配 / 礼品馈赠']
      ],
      reviews: [
        ['★★★★★','金丝楠木的纹理真的会发光！翻书时光线扫过书签，金丝一闪一闪的，太美了。','彭先生 · 2026年3月'],
        ['★★★★★','木质手感温润丝滑，比金属书签多了几分温度。淡淡的木香也让人很放松。','曾女士 · 2026年2月'],
        ['★★★★☆','书签很轻薄，质感很好。就是太轻薄了有时候夹在书里容易找不到，建议颜色再深一点点。','廖先生 · 2026年1月']
      ]
    },
    14: {
      name: '翡翠玉兰花发簪', category: '发簪', price: 298, origPrice: null,
      brief: '天然翡翠精工细作，冰种飘花雅致动人', img: '../images/products/product14.jpg',
      desc: '<p>此款翡翠玉兰花发簪选用天然A货翡翠为主材，玉质细腻润泽，呈淡淡的冰糯绿底。簪头手工雕刻一朵盛放的玉兰花，花瓣肥厚饱满，边缘微卷，栩栩如生；花蕊处以黄铜点金工艺点缀。簪身采用黄铜鎏银材质，錾刻缠枝纹，线条婉转流畅，银白与翠绿相映成趣。全长约17厘米，簪头花径约3.5厘米，盘发稳固，适合日常汉服搭配或正式场合佩戴。</p><p>每一支翡翠发簪均由玉雕匠人根据翡翠原石的天然形状与色泽进行巧雕，玉料每块不同，或飘绿花或带冰纹，件件独一无二。配素色锦盒，送礼自用两相宜。</p><div class="tab-image-placeholder"></div>',
      specs: [
        ['品牌','长安风物志'],['材质','天然A货翡翠 / 黄铜鎏银'],['工艺','手工玉雕 / 鎏银錾刻'],
        ['尺寸','全长17cm / 花径3.5cm'],['重量','约50g'],['包装','素色锦盒装'],
        ['产地','广东揭阳'],['适用场景','汉服搭配 / 日常盘发 / 礼品馈赠']
      ],
      reviews: [
        ['★★★★★','翡翠的冰糯绿底太温柔了，上手很有分量，不是那种轻飘飘的发簪。配我的齐胸襦裙，完美。','唐女士 · 2026年3月'],
        ['★★★★★','送给妻子的结婚纪念礼，她说这是她见过最美的发簪。翡翠水头不错，这个价位性价比很高。','邓先生 · 2026年2月'],
        ['★★★★☆','簪子很美，但翡翠是天然材质，和我之前买的白玉款颜色不完全一样，建议买之前有心理准备。','崔女士 · 2026年1月']
      ]
    },
    15: {
      name: '徽墨古法松烟墨锭', category: '文房', price: 168, origPrice: null,
      brief: '古法松烟制墨，墨色乌黑发亮历久弥新', img: '../images/products/product15.jpg',
      desc: '<p>此款松烟墨锭以古法工艺在安徽歙县手工制作，选用黄山老松烧烟取灰，配以冰片、麝香等名贵中药及上等皮胶，经千锤百炼捣杵成团，入模压制成型后，需在阴凉通风处晾墨半年以上方可使用。墨锭呈长方形，墨面光洁如镜，正面模印「长安风物志」字样，背面浮雕山水纹，边缘棱角分明。研磨时墨声清越，下墨顺畅不滞砚，墨色乌黑发亮，层次分明，宜书宜画。</p><p>每一方墨锭均遵循「十万杵」古训，从点烟、和料、捣杵到晾墨、描金，历经二十余道工序，单方制作周期长达半年以上。坚持古法制墨，不添加化工成分，墨香清远，百年不褪色。</p><div class="tab-image-placeholder"></div>',
      specs: [
        ['品牌','长安风物志'],['材质','黄山松烟 / 冰片 / 皮胶'],['工艺','古法手工制墨'],
        ['尺寸','约9×3×1.5cm'],['重量','约60g'],['包装','锦盒礼盒装'],
        ['产地','安徽歙县'],['适用场景','书法绘画 / 文房收藏 / 礼品馈赠']
      ],
      reviews: [
        ['★★★★★','磨墨的时候松烟香飘满书房，墨色黑中透亮，写小楷浓淡变化特别丰富。古法墨真的不一样。','余先生 · 2026年3月'],
        ['★★★★★','买来送给书法老师的新年礼物，他说这块墨锭「墨质坚润，下墨如油」，非常认可。','陆女士 · 2026年2月'],
        ['★★★★☆','墨锭品质很好，就是晾墨周期太长了，买的时候显示生产日期是半年前，到手还要再放放才能用。','田先生 · 2026年1月']
      ]
    },
    16: {
      name: '檀香木雕香囊球', category: '香囊', price: 128, origPrice: null,
      brief: '老山檀香整木镂空雕刻，随身佩戴暗香袭人', img: '../images/products/product16.jpg',
      desc: '<p>此款檀香木雕香囊球选用印度老山檀香木整料手工镂空雕刻而成，球体表面满雕镂空如意云纹与缠枝花叶，雕工繁复精细，层层透雕可见内部中空。内置天然檀香粉，香气醇厚绵长，无需点燃，常温下即可自然散发。球体直径约5.5厘米，手感圆润，经长期盘玩后檀香木表面会形成琥珀色包浆，愈发温润透亮。顶部配手工编织如意结与双色流苏，可悬挂于车内、衣橱、书房或随身佩戴。</p><p>每一枚香囊球均由福建木雕匠人纯手工镂雕，从选料到成品需经十道工序，单枚雕刻周期约5天。檀香木为天然材质，木纹与色泽各有微妙差异，件件皆是独一无二的手作雅物。</p><div class="tab-image-placeholder"></div>',
      specs: [
        ['品牌','长安风物志'],['材质','印度老山檀香木'],['工艺','手工镂空雕刻'],
        ['尺寸','直径约5.5cm'],['重量','约40g'],['包装','锦袋礼盒装'],
        ['产地','福建莆田'],['适用场景','随身佩香 / 车内悬挂 / 礼品馈赠']
      ],
      reviews: [
        ['★★★★★','檀香的奶香味太好闻了，挂在车里比任何车载香薰都高级。雕工精细到每个镂空都光滑无毛刺。','贾女士 · 2026年3月'],
        ['★★★★★','盘了一个月，表面已经开始有温润的光泽了。檀香也越来越有层次感，每天拿在手里闻一闻，心情都好。','石先生 · 2026年2月'],
        ['★★★★☆','香囊很美，但檀香味比我预期的淡一点，可能要凑近才能闻到。不过木质和雕工确实没得挑。','夏女士 · 2026年1月']
      ]
    }
  };

  var product = products[productId] || products[1];

  // ==================== 填充页面信息 ====================
  var setName = function (id, val) { var el = document.getElementById(id); if (el) el.textContent = val; };
  setName('productName', product.name);
  setName('productCategory', product.category);
  setName('productBrief', product.brief);
  setName('productPrice', '¥' + product.price);
  setName('breadcrumbName', product.name);

  var productImage = document.getElementById('productImage');
  if (productImage) productImage.src = product.img;

  if (product.origPrice) {
    var origEl = document.getElementById('productOrigPrice');
    var discEl = document.getElementById('productDiscount');
    if (origEl) { origEl.textContent = '¥' + product.origPrice; origEl.style.display = 'inline'; }
    if (discEl) {
      var disc = Math.round((1 - product.price / product.origPrice) * 100) / 10;
      discEl.textContent = disc + '折';
      discEl.style.display = 'inline';
    }
  } else {
    var origEl2 = document.getElementById('productOrigPrice');
    var discEl2 = document.getElementById('productDiscount');
    if (origEl2) origEl2.style.display = 'none';
    if (discEl2) discEl2.style.display = 'none';
  }

  document.title = product.name + ' - 长安风物志';

  // ==================== 动态渲染Tab内容 ====================

  // 商品描述
  var descContent = document.getElementById('descContent');
  if (descContent) descContent.innerHTML = product.desc;

  // 详细参数
  var specsContent = document.getElementById('specsContent');
  if (specsContent && product.specs) {
    var specsHtml = '<table class="specs-table">';
    product.specs.forEach(function (row) {
      specsHtml += '<tr><td>' + row[0] + '</td><td>' + row[1] + '</td></tr>';
    });
    specsHtml += '</table>';
    specsContent.innerHTML = specsHtml;
  }

  // 用户评价
  var reviewsContent = document.getElementById('reviewsContent');
  if (reviewsContent && product.reviews) {
    var reviewsHtml = '';
    product.reviews.forEach(function (r) {
      reviewsHtml += ''
        + '<div class="review-item">'
        + '  <div class="review-stars">' + r[0] + '</div>'
        + '  <p class="review-text">' + r[1] + '</p>'
        + '  <span class="review-author">—— ' + r[2] + '</span>'
        + '</div>';
    });
    reviewsContent.innerHTML = reviewsHtml;
  }

  // ==================== 数量增减 ====================
  var qtyInput  = document.getElementById('qtyInput');
  var qtyMinus  = document.getElementById('qtyMinus');
  var qtyPlus   = document.getElementById('qtyPlus');
  var currentQty = 1;

  if (qtyMinus) {
    qtyMinus.addEventListener('click', function () {
      if (currentQty > 1) { currentQty--; qtyInput.value = currentQty; }
    });
  }
  if (qtyPlus) {
    qtyPlus.addEventListener('click', function () {
      if (currentQty < 99) { currentQty++; qtyInput.value = currentQty; }
    });
  }

  // ==================== Tab 切换 ====================
  document.querySelectorAll('.tab-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var targetTab = this.getAttribute('data-tab');
      document.querySelectorAll('.tab-btn').forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');
      document.querySelectorAll('.tab-content').forEach(function (c) { c.classList.remove('active'); });
      var target = document.getElementById('tab-' + targetTab);
      if (target) target.classList.add('active');
    });
  });

  // ==================== 加入购物车 ====================
  var addToCartBtn = document.getElementById('addToCartBtn');
  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', function () {
      if (typeof addToCart === 'function') {
        addToCart({ id: productId, name: product.name, price: product.price, quantity: currentQty });
      }
    });
  }

  // ==================== 加入收藏 ====================
  var favBtn = document.getElementById('favBtn');
  var favKey = Storage.userKey('favorites');

  function updateFavBtn() {
    var favorites = Storage.get(favKey, []);
    var isFaved = favorites.indexOf(productId) !== -1;
    if (favBtn) {
      favBtn.textContent = isFaved ? '♥ 已收藏' : '♡ 加入收藏';
      favBtn.classList.toggle('faved', isFaved);
    }
  }

  updateFavBtn();

  if (favBtn) {
    favBtn.addEventListener('click', function () {
      if (typeof Auth !== 'undefined' && !Auth.isLoggedIn()) {
        Toast.warning('请先登录后再收藏');
        setTimeout(function () {
          window.location.href = 'login.html?redirect=detail.html%3Fid%3D' + productId;
        }, 800);
        return;
      }

      var favorites = Storage.get(favKey, []);
      var idx = favorites.indexOf(productId);

      if (idx === -1) {
        favorites.push(productId);
        Storage.set(favKey, favorites);
        Toast.success('已加入收藏');
      } else {
        favorites.splice(idx, 1);
        Storage.set(favKey, favorites);
        Toast.info('已取消收藏');
      }

      updateFavBtn();
    });
  }

  // ==================== 立即购买 ====================
  var buyNowBtn = document.getElementById('buyNowBtn');
  if (buyNowBtn) {
    buyNowBtn.addEventListener('click', function () {
      if (typeof Auth !== 'undefined' && !Auth.isLoggedIn()) {
        Toast.warning('请先登录后再购买');
        setTimeout(function () { window.location.href = 'login.html?redirect=detail.html%3Fid%3D' + productId; }, 800);
        return;
      }
      if (typeof addToCart === 'function') {
        addToCart({ id: productId, name: product.name, price: product.price, quantity: currentQty });
      }
      setTimeout(function () { window.location.href = 'cart.html'; }, 600);
    });
  }

  // ==================== 初始化 ====================
  Auth.updateNav();
});
