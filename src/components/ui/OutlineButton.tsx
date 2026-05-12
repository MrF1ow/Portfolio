interface OutlineButtonProps {
  href: string;
  children: React.ReactNode;
  dark?: boolean;
  external?: boolean;
}

export default function OutlineButton({ href, children, dark = false, external = false }: OutlineButtonProps) {
  const base = "inline-flex items-center justify-center px-7 py-3 font-mono text-sm tracking-wide transition-colors";
  const light = "bg-transparent text-text border border-text hover:bg-text/5";
  const darkStyle = "bg-transparent text-dark-text border border-dark-text hover:bg-dark-text/5";

  return (
    <a
      href={href}
      className={`${base} ${dark ? darkStyle : light}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}
