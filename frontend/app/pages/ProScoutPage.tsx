'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Bot,
  User,
  Plus,
  MessageSquare,
  Settings,
  Menu,
  X,
  Copy,
  RefreshCw,
  ThumbsUp,
  ThumbsDown,
} from 'lucide-react';

const ProScoutPage = () => {
  const [messages, setMessages] = useState([
    {
      id: '1',
      content:
        'Olá! Eu sou o ProScout AI, seu assistente inteligente para análise esportiva. Como posso ajudá-lo hoje?',
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      id: Date.now().toString(),
      content: inputMessage.trim(),
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(inputMessage),
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const generateAIResponse = (userInput: string) => {
    const responses = [
      'Baseado na sua pergunta sobre análise esportiva, posso ajudar você a entender melhor os dados dos atletas e identificar padrões de performance.',
      'Interessante pergunta! Para uma análise mais precisa, seria útil ter mais contexto sobre o time ou atleta específico que você gostaria de analisar.',
      'Vou analisar os dados disponíveis. Com base nas métricas de performance, posso sugerir algumas estratégias de treinamento personalizadas.',
      'Excelente questão! A análise de dados esportivos pode revelar insights valiosos sobre prevenção de lesões e otimização de performance.',
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const newChat = () => {
    setMessages([
      {
        id: '1',
        content:
          'Olá! Eu sou o ProScout AI, seu assistente inteligente para análise esportiva. Como posso ajudá-lo hoje?',
        sender: 'ai',
        timestamp: new Date(),
      },
    ]);
  };

  return (
    <div className="flex h-[50rem] bg-zinc-900 text-white rounded-lg mr-4">
      <div
        className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 fixed lg:relative z-50 w-64 bg-zinc-800 border-r border-zinc-700 transition-transform duration-300 ease-in-out`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-zinc-700">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ProScout AI
              </h2>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-1 hover:bg-zinc-700 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="p-4">
            <button
              onClick={newChat}
              className="w-full flex items-center gap-3 p-3 bg-zinc-700 hover:bg-zinc-600 rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
              Nova Conversa
            </button>
          </div>

          <div className="flex-1 p-4 space-y-2">
            <div className="text-xs text-gray-400 mb-2">CONVERSAS RECENTES</div>
            {[
              'Análise de Performance',
              'Prevenção de Lesões',
              'Estatísticas do Time',
            ].map((chat, idx) => (
              <button
                key={idx}
                className="w-full flex items-center gap-3 p-2 hover:bg-zinc-700 rounded text-left text-sm"
              >
                <MessageSquare className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">{chat}</span>
              </button>
            ))}
          </div>

          <div className="p-4 border-t border-zinc-700">
            <button className="w-full flex items-center gap-3 p-2 hover:bg-zinc-700 rounded text-sm">
              <Settings className="w-4 h-4" />
              Configurações
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex items-center justify-between p-4 border-b border-zinc-700 bg-zinc-800">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-zinc-700 rounded"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-lg font-semibold">ProScout AI</h1>
                <p className="text-sm text-gray-200">
                  Assistente de Análise Esportiva
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6 min-h-0">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-4 ${
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {message.sender === 'ai' && (
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Bot className="w-5 h-5" />
                </div>
              )}

              <div
                className={`max-w-3xl ${
                  message.sender === 'user' ? 'order-first' : ''
                }`}
              >
                <div
                  className={`rounded-2xl p-4 ${
                    message.sender === 'user'
                      ? 'bg-blue-600 text-white ml-auto max-w-lg'
                      : 'bg-zinc-800 border border-zinc-700'
                  }`}
                >
                  <p className="whitespace-pre-wrap leading-relaxed break-words">
                    {message.content}
                  </p>
                </div>

                <div
                  className={`flex items-center gap-2 mt-2 text-xs text-gray-400 ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <span>{formatTime(message.timestamp)}</span>
                  {message.sender === 'ai' && (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => copyMessage(message.content)}
                        className="p-1 hover:bg-zinc-700 rounded"
                        title="Copiar"
                      >
                        <Copy className="w-3 h-3" />
                      </button>
                      <button
                        className="p-1 hover:bg-zinc-700 rounded"
                        title="Regenerar"
                      >
                        <RefreshCw className="w-3 h-3" />
                      </button>
                      <button
                        className="p-1 hover:bg-zinc-700 rounded"
                        title="Gostei"
                      >
                        <ThumbsUp className="w-3 h-3" />
                      </button>
                      <button
                        className="p-1 hover:bg-zinc-700 rounded"
                        title="Não gostei"
                      >
                        <ThumbsDown className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {message.sender === 'user' && (
                <div className="w-8 h-8 bg-zinc-700 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <User className="w-5 h-5" />
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Bot className="w-5 h-5" />
              </div>
              <div className="bg-zinc-800 border border-zinc-700 rounded-2xl p-4">
                <div className="flex space-x-1 animate-pulse">
                  <div className="w-2 h-2 bg-gray-400 rounded-full" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full" />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t border-zinc-700 bg-zinc-800">
          <div className="flex items-center gap-2">
            <textarea
              ref={textareaRef}
              className="flex-1 resize-none bg-zinc-700 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Digite sua mensagem..."
              rows={1}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <button
              onClick={handleSendMessage}
              className="bg-blue-600 hover:bg-blue-500 text-white p-3 rounded-lg transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProScoutPage;
