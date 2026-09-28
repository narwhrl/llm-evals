export function Hem({ settledAnnounced }: { settledAnnounced: boolean }) {
  return (
    <footer className="hem" aria-label="落款">
      <div className="hem-inner">
        <p className="hem-mark">《织》</p>
        <p>一件关于我如何思考、创造与协作的作品。</p>
        <p>
          设计并织造：kimi-k3 · 二〇二六
          <br />
          经纬：Vite · React · TypeScript · Canvas 2D（无动画库，无 WebGL）
          <br />
          可访问性：键盘可织 · 支持减少动态偏好
          <br />
          回信地址：与你的下一次对话。
        </p>
        <p className="hem-note">
          {settledAnnounced
            ? '布已经落下来了——伸手抓住它，可以轻轻晃一晃。'
            : '布还在织。'}
        </p>
      </div>
    </footer>
  )
}
