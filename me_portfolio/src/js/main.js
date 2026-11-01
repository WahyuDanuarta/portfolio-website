/**
 * Main Application Orchestrator
 */
document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Typing Effect in Hero
  const typedTarget = document.getElementById('typedHeroText');
  if (typedTarget) {
    const phrases = [
      'Full Stack Web Developer',
      'Backend & REST API Developer',
      'Web Security & Secure Coding Enthusiast',
      'Laravel & PHP Specialist',
      'Secure Web & UI/UX Developer'
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 90;

    function typeLoop() {
      const currentPhrase = phrases[phraseIndex];

      if (isDeleting) {
        typedTarget.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 45;
      } else {
        typedTarget.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 95;
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
        typingSpeed = 2200; // Pause at end
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 450; // Pause before typing new phrase
      }

      setTimeout(typeLoop, typingSpeed);
    }

    typeLoop();
  }

  // 2. Navbar Scrolled State & ScrollSpy
  const navbar = document.getElementById('mainNavbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const backToTopBtn = document.getElementById('backToTopBtn');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;

    // Scrolled class
    if (navbar) {
      if (scrollPos > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Back to top button
    if (backToTopBtn) {
      if (scrollPos > 450) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }

    // ScrollSpy
    sections.forEach(section => {
      const top = section.offsetTop - 120;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (window.soundEngine) window.soundEngine.playClick();
    });
  }

  // 3. Mobile Navigation Drawer
  const hamburger = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navMenu.classList.toggle('open');
      hamburger.classList.toggle('active', isOpen);
      if (window.soundEngine) window.soundEngine.playClick();
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        hamburger.classList.remove('active');
      });
    });

    // Close when clicking outside menu
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && !hamburger.contains(e.target)) {
        navMenu.classList.remove('open');
        hamburger.classList.remove('active');
      }
    });
  }


  // 5. Timeline Tab Switcher
  const timelineTabs = document.querySelectorAll('.timeline-tab-btn');
  const timelineItems = document.querySelectorAll('.timeline-item');

  timelineTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      timelineTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const targetType = tab.dataset.type;
      if (window.soundEngine) window.soundEngine.playClick();

      timelineItems.forEach(item => {
        if (item.dataset.type === targetType) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // 6. Interactive Code Sandbox Tabs
  const sandboxTabs = document.querySelectorAll('.sandbox-tab-btn');
  const sandboxCodePre = document.getElementById('sandboxCodePre');

  const codeSnippets = {
    controller: `// app/Http/Controllers/OrderController.php
namespace App\\Http\\Controllers;

use App\\Services\\PaymentService;
use App\\Repositories\\OrderRepository;
use Illuminate\\Http\\JsonResponse;

class OrderController extends Controller 
{
    public function __construct(
        protected OrderRepository $orders,
        protected PaymentService $payment
    ) {}

    public function checkout(CheckoutRequest $request): JsonResponse 
    {
        $order = $this->orders->createFromCart(
            userId: auth()->id(), 
            items: $request->validated('items')
        );

        $transaction = $this->payment->processDirectGateway($order);

        return response()->json([
            'status' => 'success',
            'message' => 'Order verified & reserved.',
            'order_id' => $order->uuid,
            'receipt' => $transaction->reference_id
        ], 201);
    }
}`,
    pdf_parser: `// app/Services/DocumentParserService.php
namespace App\\Services;

use Smalot\\PdfParser\\Parser;
use Illuminate\\Support\\Facades\\DB;
use Exception;

class DocumentParserService
{
    public function __construct(protected Parser $pdfEngine) {}

    /**
     * Otomasi Ekstraksi Berkas RFC & RFR Telkom dengan Regex Offset Capture
     */
    public function extractTransactionSlip(string $filePath): array
    {
        $pdf = $this->pdfEngine->parseFile($filePath);
        $rawText = $pdf->getText();

        // 1. Ekstraksi Nomor RFC/RFR & Tanggal Transaksi
        preg_match('/(?:RFC|RFR|SURAT JALAN)\\s*[:\\/]?\\s*([A-Z0-9\\-]+)/i', $rawText, $txMatch);
        preg_match('/(?:Tanggal|Date)\\s*[:\\/]?\\s*(\\d{2}[\\/\\-]\\d{2}[\\/\\-]\\d{4})/i', $rawText, $dateMatch);

        // 2. Ekstraksi Item Material & Serial Number (ONT/Router)
        preg_match_all('/([A-Z0-9_]{6,16})\\s+([A-Za-z0-9\\s\\-\\.]+?)\\s+(\\d+)\\s+(PCS|UNIT|MTR)/i', $rawText, $items, PREG_SET_ORDER);

        return [
            'reference_no' => $txMatch[1] ?? 'UNKNOWN_REF',
            'transaction_date' => $dateMatch[1] ?? date('Y-m-d'),
            'material_count' => count($items),
            'extracted_records' => $items
        ];
    }
}`,
    database: `-- database/migrations/create_warehouse_schema.sql
CREATE TABLE inventory_items (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    sku VARCHAR(64) UNIQUE NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    category_id INT UNSIGNED NOT NULL,
    current_quantity INT UNSIGNED DEFAULT 0,
    safety_stock_threshold INT UNSIGNED DEFAULT 15,
    unit_price DECIMAL(12, 2) NOT NULL,
    warehouse_bay VARCHAR(32) NOT NULL,
    status ENUM('optimal', 'low_stock', 'depleted') GENERATED ALWAYS AS (
        CASE 
            WHEN current_quantity = 0 THEN 'depleted'
            WHEN current_quantity <= safety_stock_threshold THEN 'low_stock'
            ELSE 'optimal'
        END
    ) STORED,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_sku_status (sku, status),
    INDEX idx_warehouse_bay (warehouse_bay)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`,
    security: `// app/Http/Middleware/SecurityHardeningMiddleware.php
namespace App\\Http\\Middleware;

use Closure;
use Illuminate\\Http\\Request;
use Symfony\\Component\\HttpFoundation\\Response;

class SecurityHardeningMiddleware
{
    /**
     * Enforce OWASP Defensive Headers, Input Sanitization & Anti-Replay Verification
     */
    public function handle(Request $request, Closure $next): Response
    {
        // 1. Mitigate Parameter Tampering & Stored XSS Payloads
        $sanitized = filter_var_array($request->all(), FILTER_SANITIZE_SPECIAL_CHARS);
        $request->merge($sanitized);

        // 2. Cryptographic API Signature Verification (Anti-Replay / Nonce check)
        if ($request->is('api/v1/secure/*')) {
            $signature = $request->header('X-HMAC-Signature');
            $timestamp = $request->header('X-Timestamp');
            
            if (abs(time() - (int)$timestamp) > 300 || !hash_equals(
                hash_hmac('sha256', $request->getContent() . $timestamp, config('app.hmac_secret')),
                (string)$signature
            )) {
                return response()->json(['error' => 'Security Error: Invalid or Expired Signature'], 401);
            }
        }

        $response = $next($request);

        // 3. Inject Defensive Security Headers (OWASP Recommended)
        $response->headers->set('X-Content-Type-Options', 'nosniff');
        $response->headers->set('X-Frame-Options', 'DENY');
        $response->headers->set('X-XSS-Protection', '1; mode=block');
        $response->headers->set('Content-Security-Policy', "default-src 'self'; script-src 'self'; object-src 'none'");
        $response->headers->set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');

        return $response;
    }
}`
  };

  sandboxTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      sandboxTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const snippetKey = tab.dataset.snippet;
      if (sandboxCodePre && codeSnippets[snippetKey]) {
        sandboxCodePre.innerHTML = `<code>${escapeCode(codeSnippets[snippetKey])}</code>`;
      }
      if (window.soundEngine) window.soundEngine.playClick();
    });
  });

  function escapeCode(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }
});
