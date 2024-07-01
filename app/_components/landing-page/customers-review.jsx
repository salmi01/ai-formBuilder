import Link from 'next/link'
import React from 'react'

function CustomersReview() {
  return (
    <div>
      <section className="w-full pb-12 md:pb-24 lg:pb-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Customer Reviews</h2>
              <p className="max-w-[900px] text-center text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                See What Our Customers Say
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-1 lg:gap-12">
            <Link
              href="/aiForm/13"
              className="bg-background rounded-lg p-6 shadow-lg hover:bg-accent hover:text-accent-foreground transition-colors"
              prefetch={false}
              target='_blank'
            >
              <div className="space-y-4">
                <img
                  src="/landing/customer1.png"
                  width="900"
                  height="900"
                  alt="Form 1"
                  className="rounded-lg object-cover"
                />
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">&quot;Fast, intuitive, and saves so much time. Highly recommend!&quot;</h3>
                  <p className="text-muted-foreground">- Sarah M., Software Engineer</p>
                </div>
              </div>
            </Link>
            <Link
              href="/aiForm/18"
              className="bg-background rounded-lg p-6 shadow-lg hover:bg-accent hover:text-accent-foreground transition-colors"
              prefetch={false}
              target='_blank'
            >
              <div className="space-y-4">
                <img
                  src="/landing/customer2.png"
                  width="900"
                  height="900"
                  alt="Form 2"
                  className="rounded-lg object-cover"
                  
                />
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">&quot;Fast form creation and easy sharing. A real time-saver!&quot;</h3>
                  <p className="text-muted-foreground">- Harry, Fitness coach </p>
                </div>
              </div>
            </Link>
            <Link
              href="/aiForm/23"
              className="bg-background rounded-lg p-6 shadow-lg hover:bg-accent hover:text-accent-foreground transition-colors"
              prefetch={false}
              target='_blank'
            >
              <div className="space-y-4">
                <img
                  src="/landing/customer3.png"
                  width="900"
                  height="900"
                  alt="Form 3"
                  className="rounded-lg object-cover"
                />
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">&quot;Formaize makes form creation fast and hassle-free.&quot;</h3>
                  <p className="text-muted-foreground">- Alex Lee, Real Estate Investor</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default CustomersReview