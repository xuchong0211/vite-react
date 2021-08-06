import React from "react"
import {Button} from "antd";
import { useCount } from "../models/data"
import { Link } from "react-router-dom"

export default function About() {
    const count : {value: any, update: () => {}} = useCount()

    return (
        <div className="App">
            <header className="App-header">
                <p>欢迎来到 About me 页！</p>
                <p>你根本不用担心如何配置路由，将 tsx 文件放进 views 目录下就好了（好吧，现在仅支持一层）</p>
                <p>
                    <Button type="primary" onClick={() => count.value += 1 } >
                        count is { count.value }
                    </Button>
                </p>
                <p>是的，你没看错，首页的 count 在这里依然有效</p>
                <p>
                    <Link to="/">点击我回首页</Link>
                </p>
            </header>
    </div>
    )

}
