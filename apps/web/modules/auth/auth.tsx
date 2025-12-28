'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldSeparator,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { useMutation } from '@tanstack/react-query'
import { ArrowLeft, MailIcon, X } from 'lucide-react'
import { useState } from 'react'

import { SendMagicLink, SendMagicLinkResponse } from '@repo/types'
import { apiFetch } from '@/utils/api'
import { toast } from 'sonner'
import { Spinner } from '@/components/ui/spinner'
import { authClient } from '@/utils/auth-client'
type Props = {
  authModalType: 'login' | 'signup'
  closeModal: (bool: boolean) => void
}
const FRONTEND_URL =
  process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000'
export function AuthModal({ authModalType, closeModal }: Props) {
  const [authType, setAuthType] = useState<'signup' | 'login'>(authModalType)
  const [authMode, setAuthMode] = useState<'social' | 'email'>('social')
  const [email, setEmail] = useState<string>('')
  const [errors, setErrors] = useState<SendMagicLinkResponse['errors']>()
  const [isAuthenticatingSocial, setIsAuthenticatingSocial] =
    useState<boolean>(false)
  const [provider, setProvider] = useState<'google' | 'github' | null>(null)

  const { mutate, isPending, reset } = useMutation<
    SendMagicLinkResponse,
    { message?: string; errors?: SendMagicLinkResponse['errors'] },
    SendMagicLink
  >({
    mutationFn: (data) => {
      return apiFetch('/email/send-magic-link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include',
      })
    },
    onSuccess: (result) => {
      toast.success(result.message)
      setErrors({})
      setEmail('')
      reset()
    },
    onError: (error) => {
      console.log('error: ', error)
      setErrors(error.errors ?? {})
      toast.error(error.message || 'Something went wrong.')
      reset()
    },
  })

  const handleSocialAuth = async (provider: 'google' | 'github') => {
    setIsAuthenticatingSocial(true)
    console.log('provider: ', provider)
    try {
      const { data } = await authClient.signIn.social(
        {
          provider,
          callbackURL: FRONTEND_URL,
          newUserCallbackURL: `${FRONTEND_URL}/get-started/me`,
          errorCallbackURL: `${FRONTEND_URL}/error`,
        },

        {
          onError: ({ error }) => {
            console.log('error: ', error)
            toast.error(error.message)
          },
        },
      )
      console.log('data: ', data)
    } finally {
      setIsAuthenticatingSocial(false)
    }
  }
  return (
    <div
      inert={isPending || isAuthenticatingSocial}
      className="flex w-full max-w-sm flex-col gap-6"
    >
      <Tabs
        value={authType}
        onValueChange={(v) => setAuthType(v as 'login' | 'signup')}
      >
        <TabsList>
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Signup</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center ">
                <CardTitle>Signin to your account</CardTitle>
                {authMode === 'email' ? (
                  <Button
                    onClick={() => setAuthMode('social')}
                    variant="ghost"
                    className="w-fit flex items-center pl-0 ml-0 group"
                  >
                    <ArrowLeft className="group-hover:-translate-x-1 transition-all duration-300 ease-in-out" />{' '}
                    Back
                  </Button>
                ) : (
                  <Button onClick={() => closeModal?.(false)} variant="ghost">
                    <X />
                  </Button>
                )}
              </div>
              <CardDescription>
                Welcome back! Please sign in to continue.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-2">
              {authMode === 'social' ? (
                <div className=" flex flex-col gap-7">
                  <div className="flex flex-col gap-2">
                    <div className="grid">
                      <Button
                        onClick={() => {
                          setProvider('google')
                          handleSocialAuth('google')
                        }}
                        variant="outline"
                        type="button"
                        className="py-5"
                        disabled={isAuthenticatingSocial}
                      >
                        {isAuthenticatingSocial && provider === 'google' ? (
                          <Spinner />
                        ) : (
                          <>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                            >
                              <path
                                d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                                fill="currentColor"
                              />
                            </svg>
                            Login with Google
                          </>
                        )}
                      </Button>
                    </div>
                    <div className="grid gap-3">
                      <Button
                        onClick={() => {
                          setProvider('github')
                          handleSocialAuth('github')
                        }}
                        variant="outline"
                        type="button"
                        className="py-5"
                        disabled={
                          isAuthenticatingSocial && provider === 'github'
                        }
                      >
                        {isAuthenticatingSocial && provider === 'github' ? (
                          <Spinner />
                        ) : (
                          <>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                            >
                              <path
                                d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                                fill="currentColor"
                              />
                            </svg>
                            Login with GitHub
                          </>
                        )}
                      </Button>
                    </div>
                  </div>

                  <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                    or
                  </FieldSeparator>
                  <div className="grid gap-3">
                    <Button
                      onClick={() => setAuthMode('email')}
                      variant="outline"
                      type="button"
                      className="py-5"
                    >
                      <MailIcon />
                      Login with Email
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-5">
                  <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <FieldDescription>
                      A magic link will be sent to this email. Click the link to
                      sign in.
                    </FieldDescription>
                    {errors?.properties?.email && (
                      <FieldError>{errors.properties.email[0]}</FieldError>
                    )}
                  </Field>
                  <Field>
                    <Button
                      disabled={isPending}
                      onClick={() => mutate({ email })}
                    >
                      {isPending ? <Spinner /> : 'Send Magic Link'}
                    </Button>
                  </Field>
                </div>
              )}
            </CardContent>
            <CardFooter className="grid">
              <FieldDescription className="text-center">
                Don&apos;t have an account?{' '}
                <button
                  className="text-black hover:underline"
                  onClick={() => {
                    setAuthType((prev) =>
                      prev === 'login' ? 'signup' : 'login',
                    )
                    setAuthMode('social')
                    setEmail('')
                  }}
                >
                  {authType === 'login' ? 'Sign up' : 'Login'}
                </button>
              </FieldDescription>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="signup">
          <Card>
            <CardHeader className={cn(authMode === 'email' && 'gap-0')}>
              <div className="flex justify-between items-center">
                <CardTitle>Create your account</CardTitle>
                {authMode === 'email' ? (
                  <Button
                    onClick={() => setAuthMode('social')}
                    variant="ghost"
                    className="w-fit flex items-center pl-0 ml-0 group"
                  >
                    <ArrowLeft className="group-hover:-translate-x-1 transition-all duration-300 ease-in-out" />{' '}
                    Back
                  </Button>
                ) : (
                  <Button onClick={() => closeModal?.(false)} variant="ghost">
                    <X />
                  </Button>
                )}
              </div>
              <CardDescription>Join us today and get started.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-2">
              {authMode === 'social' ? (
                <div className=" flex flex-col gap-7">
                  <div className="flex flex-col gap-2">
                    <div className="grid">
                      <Button
                        onClick={() => {
                          setProvider('google')
                          handleSocialAuth('google')
                        }}
                        variant="outline"
                        type="button"
                        className="py-5"
                        disabled={
                          isAuthenticatingSocial && provider === 'google'
                        }
                      >
                        {isAuthenticatingSocial && provider === 'google' ? (
                          <Spinner />
                        ) : (
                          <>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                            >
                              <path
                                d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                                fill="currentColor"
                              />
                            </svg>
                            Signup with Google
                          </>
                        )}
                      </Button>
                    </div>
                    <div className="grid gap-3">
                      <Button
                        onClick={() => {
                          setProvider('github')
                          handleSocialAuth('github')
                        }}
                        variant="outline"
                        type="button"
                        className="py-5"
                        disabled={
                          isAuthenticatingSocial && provider === 'github'
                        }
                      >
                        {isAuthenticatingSocial && provider === 'github' ? (
                          <Spinner />
                        ) : (
                          <>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                            >
                              <path
                                d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                                fill="currentColor"
                              />
                            </svg>
                            Singup with GitHub
                          </>
                        )}
                      </Button>
                    </div>
                  </div>

                  <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                    or
                  </FieldSeparator>
                  <div className="grid gap-3">
                    <Button
                      onClick={() => setAuthMode('email')}
                      variant="outline"
                      type="button"
                      className="py-5"
                    >
                      <MailIcon />
                      Signup with Email
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-5">
                  <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="m@example.com"
                      required
                    />
                    <FieldDescription>
                      A magic link will be sent to this email. Click the link to
                      sign in.
                    </FieldDescription>
                    {errors?.properties?.email && (
                      <FieldError>{errors.properties.email[0]}</FieldError>
                    )}
                  </Field>
                  <Field>
                    <Button
                      disabled={isPending}
                      onClick={() => mutate({ email })}
                    >
                      {isPending ? <Spinner /> : 'Send Magic Link'}
                    </Button>
                  </Field>
                </div>
              )}
            </CardContent>
            <CardFooter className="grid">
              <FieldDescription className="text-center">
                Don&apos;t have an account?{' '}
                <button
                  className="text-black hover:underline"
                  onClick={() => {
                    setAuthType((prev) =>
                      prev === 'login' ? 'signup' : 'login',
                    )
                    setAuthMode('social')
                    setEmail('')
                  }}
                >
                  {authType === 'login' ? 'Sign up' : 'Login'}
                </button>
              </FieldDescription>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
