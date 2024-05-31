import fs from 'fs';
import React from "react"
import { ConfigProvider } from 'antd';
import { extractStyle } from '@ant-design/static-style-extract';

const outputPath = '../vendor/assets/stylesheets/antd.min.css';

const css = extractStyle(node => (
    <ConfigProvider theme={{hashed: false}}>
        {node}
    </ConfigProvider>
));

fs.writeFileSync(outputPath, css);
