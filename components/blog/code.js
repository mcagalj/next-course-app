import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark as style } from 'react-syntax-highlighter/dist/cjs/styles/prism';
export const Pre = (props) => <pre className="mt-4" {...props} />;

export const Code = (props) => {
    const match = /language-(\w+)/.exec(props.className || '');
    return match ? (
        <SyntaxHighlighter
            style={style}
            language={match[1]}
            showLineNumbers={true}
            PreTag="div"
            {...props}
        >
            {String(props.children).replace(/\n$/, '')}
        </SyntaxHighlighter>
    ) : (
        <code className="py-0 px-2 bg-hci-lila-light rounded-sm text-sm text-hci-lila-dark my-1 inline-block">
            {props.children}
        </code>
    );
};
