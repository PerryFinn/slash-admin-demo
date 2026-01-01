import { useMutation } from "@tanstack/react-query";
import demoService from "@/api/services/demoService";
import { Button } from "@/ui/button";
import { Card, CardContent } from "@/ui/card";
import { cn } from "@/utils";
import styles from "./index.module.less";

export default function TokenExpired() {
  const tokenExpiredMutation = useMutation({
    mutationFn: demoService.mockTokenExpired,
  });
  const mockTokenExpired = () => {
    tokenExpiredMutation.mutate();
  };
  const { cardDemoStyle } = styles;
  console.log("styles :>> ", styles);
  return (
    <Card>
      <CardContent className={cn(cardDemoStyle, "grid grid-cols-1 gap-4 lg:grid-cols-2")}>
        <div>
          <p>Clicking a button to simulate a token expiration scenario.</p>
        </div>
        <div>
          <Button onClick={mockTokenExpired}>Simulate Token Expired</Button>
        </div>
      </CardContent>
    </Card>
  );
}
