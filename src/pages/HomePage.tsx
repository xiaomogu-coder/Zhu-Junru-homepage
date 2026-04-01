import Navigation from '@/components/home/Navigation';
import HeroSection from '@/components/home/HeroSection';
import AboutSection from '@/components/home/AboutSection';
import ChatSection from '@/components/home/ChatSection';

/**
 * 个人主页
 * Zhu Junru (Sarah) 的个人主页,展示个人信息、经历背景,并内置数字分身聊天区
 */
export default function HomePage() {
  return (
    <div className="min-h-screen w-full">
      {/* 导航栏 */}
      <Navigation />

      {/* Hero 区块 */}
      <HeroSection />

      {/* 关于我区块 */}
      <AboutSection />

      {/* 数字分身聊天区块 */}
      <ChatSection />

      {/* 页脚 */}
      <footer className="py-8 px-4 md:px-6 border-t border-border bg-muted/30">
        <div className="container mx-auto max-w-6xl text-center">
          <p className="text-sm text-muted-foreground">
            © 2026 Zhu Junru (Sarah). All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
