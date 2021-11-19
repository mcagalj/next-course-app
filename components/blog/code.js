import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialLight as style } from 'react-syntax-highlighter/dist/esm/styles/prism';
export const Pre = (props) => <pre className="mt-4" {...props} />;

export const Code = (props) => {
    console.log(props);
    const match = /language-(\w+)/.exec(props.className || '');

    return (
        <SyntaxHighlighter
            style={style}
            language={match[1]}
            showLineNumbers={true}
            PreTag="div"
            {...props}
        >
            {String(props.children).replace(/\n$/, '')}
        </SyntaxHighlighter>
    );
};
