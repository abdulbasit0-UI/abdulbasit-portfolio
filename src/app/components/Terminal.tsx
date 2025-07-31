'use client';

import { useState, useRef, useEffect } from 'react';

type CommandOutput = {
  type: 'text' | 'list' | 'heading';
  content: string | string[];
};

type HistoryItem = {
  input: string;
  output: CommandOutput[];
};

export default function Terminal() {
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      input: '',
      output: [
        {
          type: 'text',
          content: 'Welcome to Abdulbasit\'s portfolio terminal.',
        },
        {
          type: 'text',
          content: 'Type "help" to see available commands.',
        },
      ],
    },
  ]);
  const [input, setInput] = useState('');
  const [isFocused, setIsFocused] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Auto-focus and scroll
  useEffect(() => {
    if (isFocused) inputRef.current?.focus();
  }, [isFocused]);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const commands: Record<string, () => CommandOutput[]> = {
    help: () => [
      { type: 'heading', content: 'Available Commands' },
      { type: 'list', content: [
        'skills - View technical skills',
        'experience - Work history',
        'education - Academic background',
        'projects - Notable projects',
        'blog - List recent blog posts',
        'clear - Clear the terminal',
        'help - Show this message',
        'exit - Close terminal (just kidding)'
      ]}
    ],

    skills: () => [
      { type: 'heading', content: '🛠️ Skills' },
      { type: 'list', content: [
        'Next.js', 'NestJS', 'Node.js', 'Express', 'Python',
        'Scrapy', 'MongoDB', 'Docker', 'Git / GitHub', 'Agile'
      ]}
    ],

    experience: () => [
      { type: 'heading', content: '💼 Work Experience' },
      { type: 'text', content: 'Senior Backend Engineer @ TechFlow' },
      { type: 'text', content: 'Jan 2022 – Present' },
      { type: 'text', content: '- Built microservices with NestJS and Docker' },
      { type: 'text', content: '- Led migration from monolith to modular backend' },
      { type: 'text', content: '' },
      { type: 'text', content: 'Backend Developer @ DataHarvest' },
      { type: 'text', content: 'Jun 2020 – Dec 2021' },
      { type: 'text', content: '- Developed large-scale scrapers with Scrapy' },
      { type: 'text', content: '- Integrated data pipelines into MongoDB' },
    ],

    education: () => [
      { type: 'heading', content: '🎓 Education' },
      { type: 'text', content: 'B.S. Computer Science' },
      { type: 'text', content: 'University of Engineering & Tech, 2016–2020' },
      { type: 'text', content: 'Thesis: Efficient Data Extraction in Dynamic Web Environments' },
    ],

    projects: () => [
      { type: 'heading', content: '🚀 Notable Projects' },
      { type: 'text', content: 'Scrapy Orchestrator' },
      { type: 'text', content: '- Docker-based system to run multiple Scrapy spiders' },
      { type: 'text', content: '- Centralized logging and MongoDB output' },
      { type: 'text', content: '' },
      { type: 'text', content: 'API Gateway (NestJS)' },
      { type: 'text', content: '- Rate limiting, JWT auth, service discovery' },
      { type: 'text', content: '- Serves 10+ microservices' },
    ],

    blog: () => [
      { type: 'heading', content: '✍️ Recent Blog Posts' },
      { type: 'text', content: '1. Building a Web Scraper with Python and Scrapy' },
      { type: 'text', content: '   A deep dive into Scrapy, Docker, and MongoDB.' },
      { type: 'text', content: '' },
      { type: 'text', content: 'Type "blog" to read more – just kidding, go to /blog!' },
    ],

    clear: () => {
      setHistory([]);
      return [];
    },

    exit: () => [
      { type: 'text', content: 'Nice try. This terminal is unstoppable. 🫡' }
    ],
    // @ts-expect-error: this is a type error
    unknown: (cmd: string) => [
      { type: 'text', content: `Command not found: ${cmd}. Type "help" for options.` }
    ]
  };

  const handleRunCommand = () => {
    if (!input.trim()) return;

    const cmd = input.trim().toLowerCase();
    const output = commands[cmd] ? commands[cmd]() : commands.unknown();

    setHistory((prev) => [...prev, { input, output }]);
    setInput('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleRunCommand();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleRunCommand();
    }
  };

  return (
    <div
      className="terminal-container border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden font-mono text-sm bg-black text-green-400 dark:bg-gray-900 dark:text-green-300 shadow-lg max-w-2xl mx-auto"
      onClick={() => setIsFocused(true)}
      tabIndex={0}
    >
      {/* Terminal Header */}
      <div className="bg-gray-800 dark:bg-gray-700 text-gray-200 text-xs px-3 py-1 flex items-center gap-2">
        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        <span className="ml-auto">portfolio-terminal</span>
      </div>

      {/* Output */}
      <div className="p-3 h-96 overflow-y-auto space-y-2">
        {history.map((item, i) => (
          <div key={i}>
            {item.input && (
              <div className="flex">
                <span className="text-gray-500">guest@portfolio:~$</span>
                <span className="ml-2">{item.input}</span>
              </div>
            )}
            <div className="mt-1 space-y-1 ml-8">
              {item.output.map((line, j) => {
                if (line.type === 'heading') {
                  return (
                    <h3 key={j} className="text-white font-semibold mt-2 mb-1">
                      {line.content}
                    </h3>
                  );
                }
                if (line.type === 'list') {
                  return (
                    <ul key={j} className="list-disc list-inside space-y-1">
                      {(line.content as string[]).map((li, idx) => (
                        <li key={idx}>{li}</li>
                      ))}
                    </ul>
                  );
                }
                return (
                  <p key={j} className="whitespace-pre-line">
                    {line.content}
                  </p>
                );
              })}
            </div>
          </div>
        ))}
        <div ref={terminalEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="border-t border-gray-600 p-2 bg-gray-900 dark:bg-gray-800 flex">
        <span className="text-gray-500">guest@portfolio:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="ml-2 flex-1 bg-transparent outline-none text-green-400 placeholder-gray-600"
          placeholder="Type a command..."
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
        />
        <Cursor />
      </form>
    </div>
  );
}

// Blinking cursor
function Cursor() {
  return (
    <span className="ml-1 w-3 inline-block text-green-400 animate-pulse">
      █
    </span>
  );
}