# SelfOS — Phase 1 Technical Architecture

## 1. Architecture Overview
Phase 1 of SelfOS is designed to integrate seamlessly with external AI agents while capturing contextual micro-trainings in real time. The architecture emphasizes **low-latency interactions**, **user privacy**, and **extensibility** for future integrations (VSCode extension, enterprise deployments).

**Components:**
1. **Browser Extension (Primary Interaction Layer)**
   - Detects external AI processing (DOM hooks, API listeners, or extension SDKs).
   - Displays micro-training overlay during AI wait periods.
   - Captures user responses and persists locally.
   - Minimal local storage footprint (<20KB runtime overhead).
2. **Local Encrypted Vault**
   - Stores micro-training responses, timestamps, and source context.
   - Uses AES-256 encryption with key derived from user credentials.
   - Supports offline-first operation with deferred sync.
3. **Sync Layer**
   - Securely transmits vault data to the companion webapp using HTTPS/TLS 1.3.
   - Supports incremental sync to minimize bandwidth and latency.
   - Conflict resolution: last-write-wins or user-merge for simultaneous edits.
4. **Companion Webapp (Dashboard & Knowledge Graph)**
   - Aggregates micro-training data into a user profile and evolving knowledge graph.
   - Computes AI alignment metrics and node strengths.
   - Provides visualization and export tools.
5. **Optional Backend Services (Phase 1 Minimal)**
   - Handles heavy computation (embedding generation, clustering) if client devices are limited.
   - Can be deferred to Phase 2 to maintain Phase 1 privacy-first and low-latency goal.

---

## 2. Data Flow Diagram (Logical)
```markdown
[Browser Extension Overlay]
        │
        ▼
[Local Encrypted Vault]  <-- captures → [Micro-Training Responses]
        │
        ▼
[Sync Layer]  --> encrypted transfer
        │
        ▼
[Companion Webapp]
        │
        ├─> [Knowledge Graph Computation]
        │
        └─> [Dashboard & Metrics Display]
```

1.  **Detection & Capture:** Extension detects AI activity → displays overlay.
2.  **Local Storage:** User responds → data written to encrypted vault locally.
3.  **Synchronization:** Vault syncs in background to companion webapp.
4.  **Visualization & Export:** Webapp updates knowledge graph, metrics, and visualizations. Optional export of embeddings or instruction snippets for AI adapters.

---

### 3. Security & Privacy Considerations

-   **Encryption:** AES-256 at rest for vault; TLS 1.3 in transit.
-   **User Ownership:** Full control over export/delete per datum.
-   **Integration Controls:** User explicitly opts into linking each AI agent.
-   **Offline Resilience:** Extension queues all events when offline, sync resumes automatically.
-   **Minimal Telemetry:** Only aggregate anonymized usage events, opt-in for Phase 1.

---

### 4. Performance & Scalability Notes

-   **Extension:** Lightweight DOM overlay, <20KB runtime footprint.
-   **Micro-training Capture:** Write-to-vault is sub-50ms.
-   **Webapp:** Knowledge graph updates batched for UI efficiency.
-   **Future Scaling:** Graph computation and embedding generation can be offloaded to cloud worker nodes.
-   **Cross-device Sync:** Designed to handle multiple simultaneous devices, preserving consistency via timestamps and optional manual conflict resolution.

---

### 5. Technology Stack (Phase 1)

-   **Browser Extension:** TypeScript, React, lightweight state management (Zustand or Redux Toolkit), Chrome/Firefox APIs.
-   **Local Vault:** IndexedDB + AES-256 encryption via WebCrypto.
-   **Sync & Webapp:** Node.js backend (optional) + PostgreSQL or lightweight JSON storage; HTTPS/TLS 1.3.
-   **Webapp UI:** React + D3.js for knowledge graph visualization, Tailwind CSS for layout.
-   **Authentication:** OAuth2 / OpenID Connect for webapp login; local passphrase-based key derivation for vault encryption.
-   **Analytics (optional, Phase 1 minimal):** Self-hosted Matomo / privacy-first logging.

---

### 6. Edge Cases & Error Handling

-   **AI Job Fails:** Overlay auto-dismisses, captured locally with a "retry" flag.
-   **Vault Encryption Fails:** Fallback alert to user; no data sent until resolved.
-   **Sync Conflicts:** Last-write-wins, optionally notify user via dashboard.
-   **Offline:** Store locally, sync on network restoration.
-   **Multiple Agents:** Each agent integration is namespaced in vault to avoid collisions.

---

### 7. Phase 1 Constraints

-   Minimal latency for micro-training overlays (<20s cognitive window).
-   Full offline operation with deferred sync.
-   Privacy-first: all data under user control; explicit opt-in for external AI integrations.
-   Lightweight extension: no perceptible interference with host web page or AI workflows.

> This markdown serves as the **Phase 1 technical architecture reference** for SelfOS, fully aligned with UX and implementation decisions.