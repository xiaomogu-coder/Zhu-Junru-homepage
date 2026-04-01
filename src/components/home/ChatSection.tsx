import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Send, MessageCircle } from 'lucide-react';
import { generateBotReply, getWelcomeMessage, type Message } from '@/lib/chatbot';
import { cn } from '@/lib/utils';

/**
 * 数字分身聊天区块组件
 * 支持访客与 Sarah 进行自然对话交流
 */
export default function ChatSection() {
  const [messages, setMessages] = useState<Message[]>([getWelcomeMessage()]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [shouldShake, setShouldShake] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // 自动滚动到底部
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector(
        '[data-radix-scroll-area-viewport]'
      );
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  // 处理发送消息
  const handleSendMessage = () => {
    const trimmedInput = inputValue.trim();

    // 空输入处理
    if (!trimmedInput) {
      setShouldShake(true);
      setTimeout(() => setShouldShake(false), 500);
      return;
    }

    // 添加用户消息
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: trimmedInput,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // 模拟机器人思考延迟
    setTimeout(() => {
      const botReply = generateBotReply(trimmedInput);
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        content: botReply,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 800);
  };

  // 处理键盘事件
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // 快捷问题列表
  const quickQuestions = [
    '简单介绍下你自己吧?',
    '可以和我分享一下你的兴趣爱好吗?',
    '你有特别崇拜的人吗?',
    '可以和我分享一下你的个人愿景吗?',
    '怎样联系你呢?',
  ];

  // 处理快捷问题点击
  const handleQuickQuestion = (question: string) => {
    setInputValue(question);
  };

  return (
    <section id="chat" className="py-16 md:py-24 px-4 md:px-6 bg-muted/30">
      <div className="container mx-auto max-w-4xl">
        <div className="flex items-center gap-3 mb-6 animate-fade-in">
          <MessageCircle className="w-6 h-6 md:w-7 md:h-7 text-primary" />
          <h2 className="text-2xl md:text-3xl font-bold">和 Sarah 聊聊</h2>
        </div>

        <p className="text-sm md:text-base text-muted-foreground mb-6">
          你可以向我提问任何关于我的问题,我会尽力回答。
        </p>

        <Card className="shadow-lg">
          <CardHeader className="border-b">
            <CardTitle className="text-lg md:text-xl">数字分身</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {/* 聊天消息区域 */}
            <ScrollArea ref={scrollAreaRef} className="h-[400px] md:h-[500px] p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      'flex gap-3 animate-fade-in',
                      message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                    )}
                  >
                    {/* 头像 */}
                    <Avatar className="w-8 h-8 md:w-10 md:h-10 shrink-0">
                      {message.sender === 'bot' ? (
                        <>
                          <AvatarImage
                            src="https://miaoda-conversation-file.cdn.bcebos.com/user-ahz6qmv0uqyo/20260401/file-anzw7bzfpedc.png"
                            alt="Sarah"
                          />
                          <AvatarFallback className="bg-primary text-primary-foreground text-xs md:text-sm">
                            S
                          </AvatarFallback>
                        </>
                      ) : (
                        <AvatarFallback className="bg-secondary text-secondary-foreground text-xs md:text-sm">
                          你
                        </AvatarFallback>
                      )}
                    </Avatar>

                    {/* 消息气泡 */}
                    <div
                      className={cn(
                        'flex flex-col gap-1 max-w-[75%] md:max-w-[80%]',
                        message.sender === 'user' ? 'items-end' : 'items-start'
                      )}
                    >
                      <div
                        className={cn(
                          'rounded-lg px-3 py-2 md:px-4 md:py-3 text-sm md:text-base',
                          message.sender === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-foreground'
                        )}
                      >
                        <p className="whitespace-pre-wrap break-words leading-relaxed">
                          {message.content}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                {/* 正在输入提示 */}
                {isTyping && (
                  <div className="flex gap-3 animate-fade-in">
                    <Avatar className="w-8 h-8 md:w-10 md:h-10 shrink-0">
                      <AvatarImage
                        src="https://miaoda-conversation-file.cdn.bcebos.com/user-ahz6qmv0uqyo/20260401/file-anzw7bzfpedc.png"
                        alt="Sarah"
                      />
                      <AvatarFallback className="bg-primary text-primary-foreground text-xs md:text-sm">
                        S
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-muted rounded-lg px-4 py-3">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                        <span
                          className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                          style={{ animationDelay: '0.2s' }}
                        />
                        <span
                          className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                          style={{ animationDelay: '0.4s' }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* 输入区域 */}
            <div className="border-t p-4">
              {/* 快捷问题提示 */}
              <div className="mb-3">
                <p className="text-xs text-muted-foreground mb-2">快捷问题:</p>
                <div className="flex flex-wrap gap-2">
                  {quickQuestions.map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickQuestion(question)}
                      className="text-xs h-7"
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Textarea
                  ref={textareaRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="输入你的问题..."
                  className={cn(
                    'min-h-[60px] max-h-[120px] resize-none',
                    shouldShake && 'animate-shake'
                  )}
                />
                <Button
                  onClick={handleSendMessage}
                  size="icon"
                  className="shrink-0 h-[60px] w-[60px]"
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
