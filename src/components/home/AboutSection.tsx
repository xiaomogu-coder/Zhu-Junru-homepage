import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { GraduationCap, Briefcase, FolderKanban, Mail, Phone } from 'lucide-react';

/**
 * 关于我区块组件
 * 展示教育背景、实习经历、项目经历、联系方式
 */
export default function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-24 px-4 md:px-6 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        {/* 教育背景 */}
        <div id="education" className="mb-12 animate-fade-in">
          <div className="flex items-center gap-3 mb-6">
            <GraduationCap className="w-6 h-6 md:w-7 md:h-7 text-primary" />
            <h2 className="text-2xl md:text-3xl font-bold">教育背景</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg md:text-xl">香港大学</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">经济学 · 硕士(在读)</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg md:text-xl">华南理工大学</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">金融科技 · 本科</p>
              </CardContent>
            </Card>
          </div>
        </div>

        <Separator className="my-12" />

        {/* 实习经历 */}
        <div id="experience" className="mb-12 animate-fade-in">
          <div className="flex items-center gap-3 mb-6">
            <Briefcase className="w-6 h-6 md:w-7 md:h-7 text-primary" />
            <h2 className="text-2xl md:text-3xl font-bold">实习经历</h2>
          </div>
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg md:text-xl">
                招商证券 · 研究发展中心 · 宏观数据分析实习生
              </CardTitle>
              <p className="text-sm text-muted-foreground">2024.12 — 2025.05</p>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm md:text-base text-foreground leading-relaxed">
                  <span className="font-semibold">撰写月报周报:</span> 从 Wind 及
                  iFind 数据库、国内外官网搜集整理数据,以供给侧 PMI、工业生产和需求侧的消费、投资及进出口为主,价格和金融数据为辅,分析与展望国内经济;并从海外非农就业数据、CPI
                  数据、行业库存数据、经济政策四个维度分析美国经济情况。
                </p>
              </div>
              <div>
                <p className="text-sm md:text-base text-foreground leading-relaxed">
                  <span className="font-semibold">撰写点评报告:</span> 基于美国经济分析局(BEA)官方月度数据,完成美股十多个细分行业库存同比、销售同比数据的清洗、校验与整理;依据库存与销售增速的边际变动关系,定位各细分行业当前所处的库存周期节点并输出可视化分析图表。
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Separator className="my-12" />

        {/* 项目经历 */}
        <div id="projects" className="mb-12 animate-fade-in">
          <div className="flex items-center gap-3 mb-6">
            <FolderKanban className="w-6 h-6 md:w-7 md:h-7 text-primary" />
            <h2 className="text-2xl md:text-3xl font-bold">项目经历</h2>
          </div>
          <div className="space-y-6">
            {/* 项目1 */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg md:text-xl">
                  基于因果推断 Uplift 建模的用户流失干预与收益量化
                </CardTitle>
                <p className="text-sm text-muted-foreground">2026.01 — 2026.02</p>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm md:text-base text-foreground leading-relaxed">
                  <span className="font-semibold">数据处理:</span>{' '}
                  处理用户行为与营收数据,搭建用户生命周期、历史营收、营收波动特征体系。
                </p>
                <p className="text-sm md:text-base text-foreground leading-relaxed">
                  <span className="font-semibold">基准验证:</span> 基于随机对照试验数据,通过线性回归估算干预的平均处理效应,验证
                  1 美元赠品干预可显著降低用户流失率 11
                  个百分点,但全量干预无法覆盖成本。
                </p>
                <p className="text-sm md:text-base text-foreground leading-relaxed">
                  <span className="font-semibold">多维度策略评估:</span> 基于 LightGBM
                  搭建流失分类、营收回归基准预测模型;设计 5
                  类用户挽留策略并基于潜在结果框架分别完成盈利性评估。
                </p>
                <p className="text-sm md:text-base text-foreground leading-relaxed">
                  <span className="font-semibold">因果建模:</span> 采用双稳健估计器(DRLearner)搭建用户异质处理效应模型,完成流失提升、营收提升、总收益提升全链路因果建模;最终定位对
                  ROI&gt;1 的用户精准触达为最优策略。
                </p>
              </CardContent>
            </Card>

            {/* 项目2 */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg md:text-xl">
                  阿里云天池学习赛 — 金融风险违约预测
                </CardTitle>
                <p className="text-sm text-muted-foreground">2026.01 — 2026.02</p>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm md:text-base text-foreground leading-relaxed">
                  <span className="font-semibold">探索性数据分析:</span> 通过 IV
                  值完成特征风险区分度筛选,规避特征多重共线性风险。
                </p>
                <p className="text-sm md:text-base text-foreground leading-relaxed">
                  <span className="font-semibold">特征工程:</span>{' '}
                  完成类别特征业务化编码、时序特征衍生、负债/还款能力维度的业务交叉特征构建,并基于等频分箱完成特征离散化,最终衍生出
                  50+ 有效特征。
                </p>
                <p className="text-sm md:text-base text-foreground leading-relaxed">
                  <span className="font-semibold">特征稳定性校验:</span> 基于 PSI
                  指标完成全量特征的稳定性评估,计算训练集与测试集的特征分布差异并完成排序,剔除
                  PSI 值过高的不稳定特征。
                </p>
                <p className="text-sm md:text-base text-foreground leading-relaxed">
                  <span className="font-semibold">模型调优:</span> 分别构建 CatBoost、LightGBM、XGBoost
                  单模型基线,采用 5
                  折交叉验证完成训练并使用网格搜索进行加权平均融合,最终模型线上 AUC
                  提升至 0.75。
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <Separator className="my-12" />

        {/* 联系方式 */}
        <div id="contact" className="animate-fade-in">
          <div className="flex items-center gap-3 mb-6">
            <Mail className="w-6 h-6 md:w-7 md:h-7 text-primary" />
            <h2 className="text-2xl md:text-3xl font-bold">联系方式</h2>
          </div>
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary" />
                  <span className="text-sm md:text-base">(+86) 18933383936</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <span className="text-sm md:text-base">2848796437@qq.com</span>
                </div>
                <p className="text-sm md:text-base text-muted-foreground italic mt-4">
                  君如期待你的联系
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
