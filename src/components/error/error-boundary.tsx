"use client"

import React from "react"
import * as Sentry from "@sentry/nextjs"
import { Button } from "@components/ui/button"
import { AlertTriangle, RefreshCw } from "lucide-react"

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
  errorInfo?: React.ErrorInfo
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<{ error: Error; resetError: () => void }>
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo)

    // Report to Sentry
    Sentry.withScope((scope) => {
      scope.setTag("errorBoundary", true)
      scope.setContext("errorInfo", errorInfo)
      Sentry.captureException(error)
    })

    this.setState({
      error,
      errorInfo,
    })
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback
        return <FallbackComponent error={this.state.error!} resetError={this.resetError} />
      }

      return <DefaultErrorFallback error={this.state.error!} resetError={this.resetError} />
    }

    return this.props.children
  }
}

function DefaultErrorFallback({ error, resetError }: { error: Error; resetError: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-soil-clay">
      <div className="max-w-md w-full mx-auto text-center p-8">
        <div className="w-16 h-16 bg-soil-terracotta rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="h-8 w-8 text-white" />
        </div>

        <h1 className="font-serif text-2xl font-semibold text-soil-charcoal mb-4">Something went wrong</h1>

        <p className="text-soil-earth-grey mb-6 leading-relaxed">
          We apologize for the inconvenience. Our team has been notified and is working to fix this issue.
        </p>

        {process.env.NODE_ENV === "development" && (
          <details className="mb-6 text-left">
            <summary className="cursor-pointer text-sm text-soil-earth-grey mb-2">Error Details (Development)</summary>
            <pre className="text-xs bg-soil-clay-dark p-4 rounded overflow-auto text-soil-charcoal">
              {error.message}
              {error.stack}
            </pre>
          </details>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={resetError} className="group">
            <RefreshCw className="mr-2 h-4 w-4 group-hover:rotate-180 transition-transform duration-300" />
            Try Again
          </Button>

          <Button variant="outline" onClick={() => (window.location.href = "/")}>
            Go Home
          </Button>
        </div>
      </div>
    </div>
  )
}
