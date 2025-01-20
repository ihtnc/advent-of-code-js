import hljs from 'highlight.js/lib/core';
import 'highlight.js/styles/github-dark-dimmed.css';
import './code-snippet.css';
import { type LanguageFn } from 'highlight.js';

export default function CodeSnippet ({
  code,
  language,
  languageFn,
  className,
}: Readonly<{
  code: string,
  language: string,
  languageFn: LanguageFn,
  className?: string,
}>) {
  hljs.registerLanguage(language, languageFn);

  const highlighted = hljs.highlight(code, { language });

  return (
    <div className={`${[className, "text-left pl-6 pt-6 pb-6 overflow-visible"].join(' ')}`}>
      <pre>
        <code dangerouslySetInnerHTML={{ __html: highlighted.value }}></code>
      </pre>
    </div>
  );
};