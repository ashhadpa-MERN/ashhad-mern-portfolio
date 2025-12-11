import { createClient } from 'redis'

// Redis client instance
let redisClient = null

// Initialize Redis client
const initRedis = async () => {
  if (!process.env.REDIS_URL) {
    return null
  }
  
  if (!redisClient) {
    redisClient = createClient({
      url: process.env.REDIS_URL
    })

    redisClient.on('error', (err) => {
      console.error('Redis Client Error:', err)
    })

    redisClient.on('connect', () => {
      console.log('✅ Redis connected successfully')
    })

    await redisClient.connect()
  }
  return redisClient
}

// Get cached data
export const getCachedData = async (key) => {
  try {
    const client = await initRedis()
    if (!client) return null
    const data = await client.get(key)
    return data ? JSON.parse(data) : null
  } catch (error) {
    console.error('Redis GET error:', error)
    return null
  }
}

// Set cached data with TTL
export const setCachedData = async (key, data, ttlSeconds = 3600) => {
  try {
    const client = await initRedis()
    if (!client) return false
    await client.setEx(key, ttlSeconds, JSON.stringify(data))
    return true
  } catch (error) {
    console.error('Redis SET error:', error)
    return false
  }
}

// Delete cached data
export const deleteCachedData = async (key) => {
  try {
    const client = await initRedis()
    await client.del(key)
    return true
  } catch (error) {
    console.error('Redis DELETE error:', error)
    return false
  }
}

// Delete cached data by pattern
export const deleteCachedDataByPattern = async (pattern) => {
  try {
    const client = await initRedis()
    const keys = await client.keys(pattern)
    if (keys.length > 0) {
      await client.del(keys)
    }
    return true
  } catch (error) {
    console.error('Redis DELETE pattern error:', error)
    return false
  }
}

// Clear all cache
export const clearAllCache = async () => {
  try {
    const client = await initRedis()
    await client.flushAll()
    return true
  } catch (error) {
    console.error('Redis FLUSHALL error:', error)
    return false
  }
}

// Get cache statistics
export const getCacheStats = async () => {
  try {
    const client = await initRedis()
    const info = await client.info('memory')
    const keyspace = await client.info('keyspace')
    
    return {
      memory: info,
      keyspace: keyspace,
      connected: client.isOpen
    }
  } catch (error) {
    console.error('Redis stats error:', error)
    return null
  }
}

// Close Redis connection
export const closeRedisConnection = async () => {
  try {
    if (redisClient) {
      await redisClient.quit()
      redisClient = null
    }
  } catch (error) {
    console.error('Redis close error:', error)
  }
}
