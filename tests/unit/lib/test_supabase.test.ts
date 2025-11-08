import { createClient } from '@supabase/supabase-js'

// Mock the Supabase client
jest.mock('@supabase/supabase-js', () => ({
  createClient: jest.fn(),
}))

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

  it('should create Supabase client with valid environment variables', () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co'
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-anon-key'

    const mockClient = { from: jest.fn() }
    ;(createClient as jest.Mock).mockReturnValue(mockClient)

    // Require the module after setting env vars
    const { supabase } = require('@/lib/supabase')

    expect(createClient).toHaveBeenCalledWith(
      'https://test.supabase.co',
      'test-anon-key'
    )
    expect(supabase).toBe(mockClient)
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
