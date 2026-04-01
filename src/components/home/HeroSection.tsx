import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

/**
 * Hero 区块组件
 * 展示头像、姓名和一句话介绍
 */
export default function HeroSection() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center pt-16 px-4 md:px-6"
    >
      <div className="container mx-auto max-w-4xl">
        <div className="flex flex-col items-center text-center gap-6 md:gap-8 animate-fade-in">
          {/* 头像 */}
          <Avatar className="w-32 h-32 md:w-40 md:h-40 border-4 border-primary/20 shadow-lg">
            <AvatarImage
              src="https://miaoda-conversation-file.cdn.bcebos.com/user-ahz6qmv0uqyo/20260401/file-anzw7bzfpedc.png"
              alt="Zhu Junru (Sarah)"
            />
            <AvatarFallback className="text-2xl md:text-3xl font-bold bg-primary text-primary-foreground">
              ZJ
            </AvatarFallback>
          </Avatar>

          {/* 姓名 */}
          <div>
            <h1 className="text-3xl md:text-5xl font-bold mb-2 gradient-text">
              Zhu Junru (Sarah)
            </h1>
          </div>

          {/* 一句话介绍 */}
          <div className="max-w-3xl">
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              🎓 South China University of Technology (Financial Technology) → The
              University of Hong Kong (Economics) / ✨ Interested in data analysis &
              credit risk management / 🌟 Life is a journey, not a destination!
            </p>
          </div>

          {/* 向下滚动提示 */}
          <div className="mt-8 animate-bounce">
            <button
              type="button"
              onClick={() => {
                const element = document.querySelector('#about');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="text-primary hover:text-primary/80 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
