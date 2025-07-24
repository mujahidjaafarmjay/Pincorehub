interface PaystackResponse {
  status: boolean
  message: string
  data?: any
}

interface InitializePaymentData {
  email: string
  amount: number
  reference: string
  callback_url?: string
  metadata?: Record<string, any>
}

class PaystackService {
  private baseUrl = "https://api.paystack.co"
  private secretKey = process.env.PAYSTACK_SECRET_KEY!

  private async makeRequest(endpoint: string, method: "GET" | "POST" = "GET", data?: any): Promise<PaystackResponse> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method,
      headers: {
        Authorization: `Bearer ${this.secretKey}`,
        "Content-Type": "application/json",
      },
      body: data ? JSON.stringify(data) : undefined,
    })

    return response.json()
  }

  async initializePayment(data: InitializePaymentData): Promise<PaystackResponse> {
    return this.makeRequest("/transaction/initialize", "POST", {
      ...data,
      amount: data.amount * 100, // Convert to kobo
    })
  }

  async verifyPayment(reference: string): Promise<PaystackResponse> {
    return this.makeRequest(`/transaction/verify/${reference}`)
  }

  async listTransactions(page = 1, perPage = 50): Promise<PaystackResponse> {
    return this.makeRequest(`/transaction?page=${page}&perPage=${perPage}`)
  }

  async createCustomer(
    email: string,
    firstName?: string,
    lastName?: string,
    phone?: string,
  ): Promise<PaystackResponse> {
    return this.makeRequest("/customer", "POST", {
      email,
      first_name: firstName,
      last_name: lastName,
      phone,
    })
  }
}

export const paystack = new PaystackService()
