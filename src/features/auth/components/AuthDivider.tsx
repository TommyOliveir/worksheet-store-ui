interface AuthDividerProps {
  label?: string;
}

export const AuthDivider = ({ label = "or" }: AuthDividerProps) => (
  <div className="my-6 flex items-center gap-3" role="separator">
    <span className="h-px flex-1 bg-border" />
    <span className="text-xs uppercase text-muted-foreground">{label}</span>
    <span className="h-px flex-1 bg-border" />
  </div>
);
