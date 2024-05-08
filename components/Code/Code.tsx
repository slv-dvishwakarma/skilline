import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vs } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeProps {
    codeString?: string;
}

export const Code: React.FC<CodeProps> = ({ codeString }) => {
    return (
        <>
            {codeString ? (
                <div className='bg-code_code  my-5'>
                    <SyntaxHighlighter language="javascript" style={vs}>
                        {codeString || ""}
                    </SyntaxHighlighter>
                </div>
            ) : null}
        </>
    )
}
