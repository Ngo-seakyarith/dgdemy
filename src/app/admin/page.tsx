'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Shield, FileText, LogOut } from 'lucide-react';

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();

  const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

  useEffect(() => {
    // Check if already authenticated from localStorage
    const authStatus = localStorage.getItem('admin_authenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleAuth = () => {
    console.log('Admin auth attempt:', { password: password ? '***' : '', adminPassword: ADMIN_PASSWORD ? '***' : '' });
    if (password === ADMIN_PASSWORD) {
      console.log('Admin authentication successful');
      setIsAuthenticated(true);
      localStorage.setItem('admin_authenticated', 'true');
      setMessage('');

      // Redirect to intended page or default to ai-practice
      const redirectTo = searchParams.get('redirect') || '/admin/ai-practice';
      router.push(redirectTo);
    } else {
      console.log('Admin authentication failed');
      setMessage('Incorrect password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('admin_authenticated');
    setPassword('');
    setMessage('');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-muted/50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-muted/50 flex items-center justify-center">
        <div className="max-w-md w-full px-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-center flex items-center justify-center gap-2">
                <Shield className="h-6 w-6" />
                Admin Access
              </CardTitle>
              <CardDescription className="text-center">
                Enter your admin password to access the management panel
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Admin Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password"
                    onKeyPress={(e) => e.key === 'Enter' && handleAuth()}
                  />
                </div>

                {message && (
                  <Alert variant="destructive">
                    <AlertDescription>{message}</AlertDescription>
                  </Alert>
                )}

                <Button onClick={handleAuth} className="w-full">
                  Access Admin Panel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-3xl">Admin Panel</CardTitle>
                <CardDescription>
                  Manage your platform content and settings
                </CardDescription>
              </div>
              <Button onClick={handleLogout} variant="destructive">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    AI Practice Management
                  </CardTitle>
                  <CardDescription>
                    Upload and manage AI practice content
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full">
                    <Link href="/admin/ai-practice">
                      Manage AI Practice →
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Course Catalog Management
                  </CardTitle>
                  <CardDescription>
                    Upload and manage course documents
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full" variant="secondary">
                    <Link href="/admin/professional-training">
                      Manage Course Catalog →
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}