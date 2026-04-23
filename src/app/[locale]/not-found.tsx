// app/not-found.tsx
export default function NotFound() {
  return (
    <html>
      <body className="h-screen flex items-center justify-center bg-surface font-[Inter,sans-serif]">
        <div className="flex flex-col items-center gap-3 text-center px-4">
          <span className="text-5xl font-bold text-foreground tracking-tight">404</span>
          <h2 className="text-base font-medium text-foreground">페이지를 찾을 수 없어요</h2>
          <p className="text-sm text-muted-foreground">URL을 다시 확인해 주세요.</p>
        </div>
      </body>
    </html>
  );
}
