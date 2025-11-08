/**
 * @jest-environment node
 */

describe('Supabase Client Configuration', () => {
  const originalEnv = process.env

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...originalEnv }
    jest.clearAllMocks()
  })

  afterEach(() => {
    process.env = originalEnv
  })

  it('should require NEXT_PUBLIC_SUPABASE_URL environment variable', () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co'
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-anon-key'

    // Should not throw when both env vars are present
    expect(() => {
      jest.isolateModules(() => {
        require('@/lib/supabase')
      })
    }).not.toThrow()
  })

  it('should throw error when NEXT_PUBLIC_SUPABASE_URL is missing', () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = ''
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-anon-key'

    expect(() => {
      jest.isolateModules(() => {
        require('@/lib/supabase')
      })
    }).toThrow('Missing Supabase environment variables')
  })

  it('should throw error when NEXT_PUBLIC_SUPABASE_ANON_KEY is missing', () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co'
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = ''

    expect(() => {
      jest.isolateModules(() => {
        require('@/lib/supabase')
      })
    }).toThrow('Missing Supabase environment variables')
  })

  it('should throw error when both environment variables are missing', () => {
    delete process.env.NEXT_PUBLIC_SUPABASE_URL
    delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    expect(() => {
      jest.isolateModules(() => {
        require('@/lib/supabase')
      })
    }).toThrow('Missing Supabase environment variables')
  })

  it('should include helpful error message about .env file', () => {
    delete process.env.NEXT_PUBLIC_SUPABASE_URL
    delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    expect(() => {
      jest.isolateModules(() => {
        require('@/lib/supabase')
      })
    }).toThrow(/Please check your .env file/)
  })
})
