import typescript from 'highlight.js/lib/languages/typescript';
import CodeSnippet from './index';

export default function TypescriptCode({
  code,
  className,
} : Readonly<{
  code: string,
  className?: string,
}>) {
  return (
    <CodeSnippet code={code} language='typescript' languageFn={typescript} className={className} />
  );
};