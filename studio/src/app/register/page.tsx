import { AuthLayout } from '@/components/auth-layout';
import { RegisterForm } from '@/components/register-form';
import { Card, CardContent } from '@/components/ui/card';

export default function RegisterPage() {
  return (
    <AuthLayout>
       <Card>
        <CardContent className="p-6">
          <RegisterForm />
        </CardContent>
      </Card>
    </AuthLayout>
  );
}
