.PHONY: supabase-start supabase-stop supabase-status


supabase-up:
	@cd supabase/local; \
	supabase start; \
	cd ../test; \
	supabase start	

supabase-down:
	@echo "Stopping supabase..."; \
	cd supabase/local; \
	supabase stop; \
	cd ../test; \
	supabase stop

supabase-status:
	@cd supabase/local; \
	supabase status; \
	cd ../test; \
	supabase status