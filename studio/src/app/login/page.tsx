import { AuthLayout } from '@/components/auth-layout';



import { LoginForm } from '@/components/login-form';
import { Card, CardContent } from '@/components/ui/card';

export default function LoginPage() {
  return (
    <AuthLayout>
      <Card className="shadow-2xl border border-primary/10 rounded-xl bg-card dark:bg-gray-900">
        <CardContent className="p-6">
          <LoginForm />
        </CardContent>
      </Card>
    </AuthLayout>
  );
}
